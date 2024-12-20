import mongoose, { Schema } from "mongoose";
// Define the Project Schema
const ProjectSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the User who owns the project
    projectType: { type: String },
    projectName: { type: String },
    role: { type: String },
    hourlyRate: { type: Number },
    minExperience: { type: Number },
    duration: { type: Number },
    status: { type: String, enum: ["active", "completed", "pending"], default: "pending" },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});
// Export the Project model
export default mongoose.model("Project", ProjectSchema);
