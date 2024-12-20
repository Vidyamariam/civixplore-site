import { User } from "../../../domain/interfaces/User.js";
import { UserRepository } from "../../../domain/repositories/UserRepository.js";
import UserModel from "../models/UserModel.js";
import CategoryModel from "../models/CategoryModel.js";
import { emailService } from "../../../services/emailService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Project } from "../../../domain/interfaces/Project.js";
import ProjectModel from "../models/ProjectModel.js";
import { Response } from "express";

export class MongoUserRepository implements UserRepository {

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ email }).lean();

      // If user is not found, return null
      if (!user) {
        return null;
      }

      // Explicitly map MongoDB fields to your User interface
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password, // This is the hashed password
        role: user.role,
        isVerified: user.isVerified,
        isApproved: user.isApproved,
        status: user.status,
        isBlocked: user.isBlocked,
        otp: user.otp ?? null,
      };
    } catch (error: any) {
      // Log the error for debugging purposes
      console.error("Error finding user by email:", error);
      throw new Error("Database error occurred while finding user.");
    }
  }
  

  async createUser(user: User) {
    // Step 1: Check if user already exists
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      return {
        success: false,
        message: "User already exists"
      };
    }

    // Step 2: Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Step 3: Hash the user's password for security
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Step 4: Store the user in the database with isVerified set to false
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      isVerified: false,
      isApproved: false,
      otp,
    });

    await newUser.save();

    await emailService.sendOTP(user.email, otp);

    return {
      success: true,
      message: "OTP sent to registered email. Please verify.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isVerified: newUser.isVerified,
      },
    };
  }


 async verifyOtp(email: string, enteredOtp: string) {
    try {
      // Step 1: Retrieve the user by email from the database
      const user = await UserModel.findOne({ email });
      
      if (!user) {

        return {success: false, message:"User not found."};
      }
  
      const otpString = Array.isArray(enteredOtp) ? enteredOtp.join('') : enteredOtp;

      // Step 3: Check if the entered OTP matches the OTP stored in the user's document
      if (user.otp !== otpString) {
        return {
          success: false, message: "Invalid otp, please try again!"
        }
      }
      
      user.isVerified = true;
      user.otp = null; 
      await user.save();
     console.log("After save:", user);

      const updatedUser = await UserModel.findOne({ email });
  
      // Step 4: Return a success message
      return {
        success: true,
        message: "OTP verified successfully.",
        user: updatedUser,
      };

    } catch (error: any) {
      // Handle any errors (e.g., user not found, invalid OTP)
      throw new Error("OTP verification failed: " + error.message);
    }
  }

  
  async resendOtp(email: string) {
    try {
      console.log("Email being searched in resendOtp: ", email);
  
      // Case-insensitive search
      const user = await UserModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
  
      console.log("User found in resendOtp: ", user);
  
      if (!user) {
        throw new Error("User not found.");
      }
  
      // Generate a new OTP
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
  
      user.otp = newOtp;
  
      // Save the new OTP
      await user.save();
  
      // Send the new OTP via email
      await emailService.sendOTP(user.email, newOtp);

      const updatedUser = await UserModel.findOne({ email });
  
      return { success: true, message: "OTP resent successfully.", user: updatedUser };
    } catch (error: any) {
      throw new Error("Failed to resend OTP: " + error.message);
    }
  }

  
  async getGroupedCategories(): Promise<{ projectTypes: string[]; roles: string[] }> {
    try {
      const categories = await CategoryModel.find();

      const groupedCategories = categories.reduce(
        (acc: { projectTypes: string[]; roles: string[] }, category) => {
          if (category.type === "projectType") {
            acc.projectTypes.push(category.name); 
          } else if (category.type === "role") {
            acc.roles.push(category.name); 
          }
          return acc;
        },
        { projectTypes: [], roles: [] }
      );

      return groupedCategories;
    } catch (error) {
      throw new Error("Error fetching categories");
    }
  }

   async submitOnboardingForm(data: { email: string; project: Project; }){
       
     try{
      const { email, project } = data;

      console.log("Incoming project details:", project); // Debug log

      const existingUser = await UserModel.findOne({email})

      // If user does not exist, return error message
      if (!existingUser) {
        return { message: "User not found. Please register first." };
      }

      const newProject = new ProjectModel({
        userId: existingUser._id,
        projectName: project.projectName,
        projectType: project.projectType,
        role: project.role,
        hourlyRate: Number(project.hourlyRate),
        minExperience: Number(project.minExperience), // Safely convert to number
        duration: Number(project.duration), // Safely convert to number
        status: "pending",
      });

      console.log("Project details before saving:", newProject);

      await newProject.save().catch(error => {
     console.error("Error saving project details:", error);
      return { message: "Error saving project details" };
    });

      return { message: "Onboarding completed successfully." };
     }catch(error: any){
       // Log the full error to the console for debugging
    console.error("Error during onboarding:", error);
    // Throw a more detailed error with the actual error message
    throw new Error(`Error saving Project details: ${error.message || error}`);

     }

   }


   async userLogin(
  email: string,
  password: string,
  res: Response
): Promise<
  { success: true; token: string; user: User } | { success: false; message: string }
> {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { success: false, message: 'User not found. Please register.' };
    }

    if (!user.isVerified) {
      return { success: false, message: 'User is not verified. Please verify your account.' };
    }

    if (!user.isApproved) {
      return { success: false, message: 'Your account is not approved yet.' };
    }

    if (user.isBlocked) {
      return { success: false, message: 'Your account is blocked. Please contact support.' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: 'Invalid credentials. Please try again.' };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_USER!,
      { expiresIn: '1h' }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    const userData: User = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isApproved: user.isApproved,
      password: user.password,
      status: user.status,
      isBlocked: user.isBlocked,
    };

    return {
      success: true,
      token: token,
      user: userData,
    };
  } catch (error) {
    console.error('Error in userLogin:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

  
}