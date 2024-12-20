import { Customer } from "../interfaces/Customer.js";
import { User } from "../interfaces/User.js";

export interface CustomerRepository{

    updateProfile(email: string, updatedData: Partial<Customer>): Promise<Customer>;

    getProfile(email: string): Promise<{
        user: User;
        customer: Customer | { phoneNumber: string; location: string; additionalDetails: string; profilePicture: string };
      }>;
}