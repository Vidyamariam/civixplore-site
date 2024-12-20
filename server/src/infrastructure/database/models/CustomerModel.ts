import mongoose, { Document, Schema } from "mongoose";
import { Customer } from "../../../domain/interfaces/Customer.js";

interface CustomerDocument extends Customer, Document {}

const CustomerSchema = new Schema<CustomerDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User", // Refers to the User model
        required: true,
      },
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
      location: { type: String, required: true },
      additionalDetails: { type: String },
      profilePicture: { type: String, default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
    }
  );
  
  // Export the Customer model
  export default mongoose.model<CustomerDocument>("Customer", CustomerSchema);
  