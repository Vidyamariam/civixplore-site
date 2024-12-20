import mongoose, { Schema, Document } from "mongoose";

import { Category } from "../../../domain/interfaces/Category.js";

// Define the schema for a Category
const CategorySchema: Schema<Category> = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["projectType", "role"], // Valid values for 'type'
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Category model
const CategoryModel = mongoose.model<Category>("Category", CategorySchema);

export default CategoryModel;
