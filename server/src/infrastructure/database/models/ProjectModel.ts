import mongoose, { Document, Schema } from "mongoose";
import { Project } from "../../../domain/interfaces/Project.js";

// Define ProjectDocument interface, extending Project and Mongoose Document
interface ProjectDocument extends Project, Document {}

// Define the Project Schema
const ProjectSchema = new Schema<ProjectDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User"}, // Reference to the User who owns the project
    projectType: { type: String },
    projectName: { type: String },
    role: { type: String },
    hourlyRate: { type: Number },
    minExperience: { type: Number},
    duration: { type: Number}, 
    status: { type: String, enum: ["active", "completed", "pending"], default: "pending" },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export the Project model
export default mongoose.model<ProjectDocument>("Project", ProjectSchema);
