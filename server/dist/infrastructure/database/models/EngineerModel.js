import mongoose, { Schema } from "mongoose";
const CertificationSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
});
const EngineerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    projectType: { type: String, required: true },
    experience: { type: Number, default: null },
    isFresher: { type: Boolean },
    linkedInUrl: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    location: { type: String, required: true },
    skills: { type: [String], required: true },
    certifications: { type: [CertificationSchema], default: [] },
    resumeUrl: { type: String, default: null },
});
export default mongoose.model("Engineer", EngineerSchema);
