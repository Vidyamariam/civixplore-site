// src/infrastructure/database/models/AdminModel.ts
import mongoose, { Schema } from "mongoose";
const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "admin" },
});
const AdminModel = mongoose.model("Admin", adminSchema);
export default AdminModel;
