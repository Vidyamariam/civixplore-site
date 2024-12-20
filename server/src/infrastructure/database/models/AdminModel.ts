// src/infrastructure/database/models/AdminModel.ts
import mongoose, { Schema, Document } from "mongoose";
import { Admin } from "../../../domain/interfaces/Admin.js";

const adminSchema = new Schema<Admin & Document>({
  email: { type: String, unique: true },
  password: { type: String},
  role: { type: String, default: "admin" },
});

const AdminModel = mongoose.model<Admin & Document>("Admin", adminSchema);

export default AdminModel;
