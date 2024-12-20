import mongoose from "mongoose";
import EngineerModel from "../models/EngineerModel.js";
import UserModel from "../models/UserModel.js";
import { EngineerRepository } from "../../../domain/repositories/engineerRepository.js";
import { Engineer } from "../../../domain/interfaces/Engineer.js";
import { User } from "../../../domain/interfaces/User.js";

export class MongoEngineerRepository implements EngineerRepository {
  
    async submitOnboardingForm(
    email: string,
    engineer: Engineer
  ): Promise<Engineer | { message: string }> {
    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return { message: "User not found with the provided email." };
      }

      // Create a new Engineer document
      const newEngineer = new EngineerModel({
        userId: user._id, // Associate the userId with the user found
        role: engineer.role,
        projectType: engineer.projectType,
        experience: engineer.experience,
        isFresher: engineer.isFresher,
        linkedInUrl: engineer.linkedInUrl,
        hourlyRate: engineer.hourlyRate,
        location: engineer.location,
        skills: engineer.skills,
        certifications: engineer.certifications,
        resumeUrl: engineer.resumeUrl,
      });

      // Save the document to the database
      const savedEngineer = await newEngineer.save();

      // Return the saved Engineer document
      return savedEngineer.toObject();
    } catch (error) {
      console.error("Error in submitOnboardingForm:", error);
      return { message: "An error occurred while submitting the onboarding form." };
    }
  }


  async getUserIdByEmail(email: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }
  
    return user._id.toString();
  }

  
}
