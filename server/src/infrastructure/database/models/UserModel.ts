import mongoose, { Document, Schema } from "mongoose";
import { User } from "../../../domain/interfaces/User.js";

// Define UserDocument interface, extending Omit<User, "id"> and Mongoose Document
interface UserDocument extends Omit<User, "id">, Document {
  _id: mongoose.Types.ObjectId;
  isVerified: boolean; 
  otp: string | null; 
}

// Define the User Schema with additional fields
const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "engineer", "admin"], required: true },
  isVerified: { type: Boolean, default: false, select: true },
  isApproved: {
    type: Boolean,
    default: false, // Users are not approved by default
  },
  otp: {
    type: String,
    default: null,
    expires: 60,
  }, 
  status: {
    type: String,
    enum: ["pending", "approved"], // Possible values for status
    default: "pending", // Default status is 'pending'
  },
  isBlocked: {
    type: Boolean,
    default: false, // Users are not blocked by default
  }
}, {
  timestamps: true, 
});

// Export the User model
export default mongoose.model<UserDocument>("User", UserSchema);
