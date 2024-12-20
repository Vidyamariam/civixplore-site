import { Types } from "mongoose";

export interface Project {
  userId: Types.ObjectId; 
  projectType: string;
  projectName: string;
  role: string;
  hourlyRate: number;
  minExperience: number;
  duration: number; // In months
  status?: "active" | "completed" | "pending";
}
