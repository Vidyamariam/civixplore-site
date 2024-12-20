// src/infrastructure/repositories/MongoAdminRepository.ts
import { AdminRepository } from "../../../../domain/repositories/AdminRepository.js";
import AdminModel from "../../models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../../../../domain/interfaces/Admin.js";
import CategoryModel from "../../models/CategoryModel.js";
import { Category } from "../../../../domain/interfaces/Category.js";
import UserModel from "../../models/UserModel.js";
import { User } from "../../../../domain/interfaces/User.js";
import SubscriptionPlanModel from "../../models/SubscriptionModel.js";
import { SubscriptionPlan } from "../../../../domain/interfaces/SubscriptionPlan.js";
import mongoose from "mongoose";

export class MongoAdminRepository implements AdminRepository {
  
  // Find admin by email
  async findByEmail(email: string): Promise<Admin | null> {
    try {
      const admin = await AdminModel.findOne({ email }).lean();

      if (!admin) {
        return null;
      }

      return {
        id: admin._id.toString(),
        email: admin.email,
        password: admin.password, // Hashed password
        role: admin.role,
      };
    } catch (error: any) {
      console.error("Error finding admin by email:", error);
      throw new Error("Database error occurred while finding admin.");
    }
  }

 
  
 // Admin login
async loginAdmin(email: string, password: string): Promise<{ success: true; message: string; token: string } | { success: false; message: string }> {
  const admin = await this.findByEmail(email);

  // If admin is not found, throw an error
  if (!admin) {
     return { success: false, message:"Admin not found."};
  }

  // Check if the provided password matches the hashed password
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return { success: false, message:"Invalid credentials."};
  }

  const jwtSecret = process.env.JWT_SECRET_ADMIN;
  // Generate JWT token for the admin
  const token = jwt.sign({ id: admin.id, role: admin.role }, jwtSecret!, {
    expiresIn: "1h",
  });

  return {
    success: true,
    message: "Login successful.",
    token,
  };
}

async addCategory(category: Category): Promise<{ success: boolean; message: string ; data?: Category }> {
  try {
    // Check if category already exists
    const existingCategory = await CategoryModel.findOne({ name: category.name, type: category.type });
    if (existingCategory) {
      return { success: false, message: "Category already exists" , data: existingCategory};
    }

    // Save new category
    const newCategory = new CategoryModel(category);
    await newCategory.save();

    return { success: true, message: "Category added successfully", data: newCategory };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to add category" };
  }
}

async getCategories(): Promise<Category[]> {
  try {
    const categories = await CategoryModel.find({});
    return categories; // Return the fetched categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

async updateCategory(
  id: string,
  updatedCategory: Partial<Category>
) {
  try {

      // Validate the 'type' field
      if (updatedCategory.type && !["projectType", "role"].includes(updatedCategory.type)) {
        return { success: false, message: "Invalid 'type' value. Allowed values are 'projectType' or 'role'." };
      }
      
    // Find the category by ID
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the category by ID
    const category = await CategoryModel.findById(objectId);

    console.log("category to be edited: ", category);
    
    if (!category) {
      return { success: false, message: "Category not found" };
    }

    // Check if a category with the same name and type already exists (excluding the current category)
    const duplicateCategory = await CategoryModel.findOne({
      name: updatedCategory.name,
      type: updatedCategory.type,
      _id: { $ne: objectId },
    });

    if (duplicateCategory) {
      return { success: false, message: "Category with the same name and type already exists" };
    }

    // Only update the fields that are provided in updatedCategory
    if (updatedCategory.name && updatedCategory.name !== category.name) {
      // Ensure that the new name is unique
      const existingCategory = await CategoryModel.findOne({
        name: updatedCategory.name,
        type: updatedCategory.type,
        _id: { $ne: objectId }, // Exclude the current category
      });

      if (existingCategory) {
        return { success: false, message: 'Category with name and type already exists' };
      }
      category.name = updatedCategory.name;
    }

    // Update the type if provided
    if (updatedCategory.type) {
      category.type = updatedCategory.type;
    }

    // Save the updated category
    await category.save();

    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, message: "Failed to update category" };
  }
}


async deleteCategory(id: string){
  try {
    // Find the category by ID
    const category = await CategoryModel.findById(id);
    if (!category) {
      return { success: false, message: "Category not found" };
    }

    // Delete the category
    await CategoryModel.findByIdAndDelete(id);

    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Failed to delete category" };
  }
}

async getCustomers(): Promise<User[]> {
  try {
    const customers = await UserModel.find({ role: "customer" }).select("-password");
   console.log("custmers in repo: ",customers);
   
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers.");
  }
}

async approveUser(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { status: 'approved', isApproved: true },
      { new: true } // Return the updated document
    );

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "User approved successfully" };
  } catch (error) {
    console.error("Error approving user:", error);
    return { success: false, message: "Server error while approving user" };
  }
}

async getEngineers(): Promise<User[]> {
  try {
    const engineers = await UserModel.find({ role: "engineer" }).select("-password");
   console.log("custmers in repo: ",engineers);
   
    return engineers;
  } catch (error) {
    console.error("Error fetching engineers:", error);
    throw new Error("Failed to fetch engineers.");
  }

}


async blockUser(id: string,  isBlocked: boolean): Promise<{ success: boolean; message: string }> {
  try {

     const userId = id.trim();
    // Update the `isBlocked` field to `true` for the given user ID
    const result = await UserModel.updateOne(
      { _id: userId },  // Find the user by ID
      { $set: { isBlocked } }  // Set the `isBlocked` field to the value received
    );


    // Check if the user was found and updated
    if (!result) {
      return {
        success: false,
        message: "User not found or already blocked.",
      };
    }

     return {
      success: true,
      message: `User has been successfully ${isBlocked ? "blocked" : "unblocked"}.`,
    };
  } catch (error) {
    console.error("Error blocking user:", error);
    return {
      success: false,
      message: "An error occurred while blocking the user.",
    };
  }
}


async createSubscriptionPlan(plan: SubscriptionPlan): Promise<{ success: boolean; message: string; data?: SubscriptionPlan }> {
  try {
    // Validate if a plan with the same name already exists
    const existingPlan = await SubscriptionPlanModel.findOne({ name: plan.name });
    if (existingPlan) {
      return { success: false, message: "A subscription plan with this name already exists" };
    }

    // Create a new subscription plan document
    const newPlan = new SubscriptionPlanModel(plan);
    await newPlan.save();

    return { success: true, message: "Subscription plan created successfully", data: newPlan };
  } catch (error: any) {
    console.error("Error creating subscription plan:", error);
    return { success: false, message: `Error creating subscription plan: ${error.message}` };
  }
}


async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
     try{

       const plans = await SubscriptionPlanModel.find({});


       return plans;
     }
     catch (error: any) {
      console.error("Error fetching subsciption plans:", error);
    throw new Error("Failed to fetch subsciption plans");
    }

}

async updateSubscriptionPlan(id: string, updatedPlan: Partial<SubscriptionPlan>) {
  try {
    // Log the received ID and updated plan
    console.log("Updating Subscription Plan:");
    console.log("Received ID:", id);
    console.log("Updated Plan Data:", updatedPlan);

    // Flatten the updatedPlan data if it has a 'plan' property
    const flattenedUpdatedPlan =
      "plan" in updatedPlan && updatedPlan.plan
        ? updatedPlan.plan
        : updatedPlan;

    // Use $set operator with the provided flattened updated plan
    const updateQuery = { $set: flattenedUpdatedPlan };

    // Attempt to find and update the subscription plan
    console.log("Finding and updating subscription plan in the database...");
    const result = await SubscriptionPlanModel.findByIdAndUpdate(
      id,
      updateQuery,
      { new: true }
    );

    // Log the result after the update attempt
    console.log("Database Update Result:", result);

    // Check if the document was found
    if (!result) {
      console.log("Subscription plan not found for the given ID:", id);
      return { success: false, message: "Subscription plan not found" };
    }

    console.log("Subscription plan updated successfully.");
    return {
      success: true,
      message: "Subscription plan updated successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error updating subscription plan:", error);
    return { success: false, message: "Failed to update subscription plan" };
  }
}

async deleteSubscriptionPlan(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the ID
    if (!id) {
      return { success: false, message: "Subscription ID is required" };
    }

    // Attempt to delete the subscription plan
    const result = await SubscriptionPlanModel.findByIdAndDelete(id);

    // Check if the subscription plan existed and was deleted
    if (!result) {
      return { success: false, message: "Subscription plan not found" };
    }

    // Return success response
    return {
      success: true,
      message: "Subscription plan deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleteSubscriptionPlan:", error);
    return {
      success: false,
      message: "Failed to delete subscription plan",
    };
  }
}


}