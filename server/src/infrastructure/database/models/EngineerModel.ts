import mongoose, { Document, Schema } from "mongoose";
import { Engineer } from "../../../domain/interfaces/Engineer.js";

interface EngineerDocument extends Engineer, Document{}

const CertificationSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
  });
  

const EngineerSchema = new Schema <EngineerDocument>(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User"},
        role: { type: String, required: true },
        projectType: { type: String, required: true },
        experience: { type: Number, default: null },
        isFresher: { type: Boolean},
        linkedInUrl: { type: String, required: true },
        hourlyRate: { type: Number, required: true },
        location: { type: String, required: true },
        skills: { type: [String], required: true },
        certifications: { type: [CertificationSchema], default: [] },
        resumeUrl: { type: String, default: null },
    }
)

export default mongoose.model<EngineerDocument>("Engineer", EngineerSchema );

