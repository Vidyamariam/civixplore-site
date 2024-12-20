import {Types} from "mongoose";

// TypeScript interface for the Engineer document
export interface Engineer{
    userId: Types.ObjectId;
    role: string;
    projectType: string;
    experience: number | null;
    isFresher: boolean;
    linkedInUrl: string;
    hourlyRate: number;
    location: string;
    skills: string[];
    certifications: { id: number; name: string }[];
    resumeUrl?: string | null; // Optional field for the uploaded resume URL
  }