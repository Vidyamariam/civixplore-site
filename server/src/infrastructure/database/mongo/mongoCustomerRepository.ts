import UserModel from "../models/UserModel.js";
import CustomerModel from "../models/CustomerModel.js";
import { CustomerRepository } from "../../../domain/repositories/customerRepository.js";
import { Customer } from "../../../domain/interfaces/Customer.js";
import { User } from "../../../domain/interfaces/User.js";

export class CustomerRepositoryImpl implements CustomerRepository {
  async updateProfile(
    email: string,
    updatedData: Partial<Customer>
  ): Promise<Customer> {
    // Ensure the user exists and has the role 'customer'
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    
    if (user.role !== "customer") {
      throw new Error("User is not authorized to update customer details");
    }

    // Find existing customer or create a new one
    const customer = await CustomerModel.findOneAndUpdate(
      { userId: user._id },
      { ...updatedData },
      { new: true, upsert: true } // Create if not exists
    );

    if (!customer) {
      throw new Error("Failed to update customer details");
    }

    return customer.toObject();
  }


  async getProfile(email: string) {
    // Find the user based on the email
     
    console.log("Searching user with email:", email);

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
 

    if (user.role !== "customer") {
      throw new Error("User is not authorized to access customer details");
    }

     // Step 2: Find the customer details in the Customer collection
  const customer = await CustomerModel.findOne({ userId: user._id });


  return {
    user: user.toObject(),
    customer: customer
      ? customer.toObject()
      : { phoneNumber: "", location: "", additionalDetails: "" , profilePicture: ""}, // Default structure
  };

  }

  
}
