import mongoose, { Schema } from "mongoose";
// Define the schema for a Category
const CategorySchema = new Schema({
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
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});
// Create the Category model
const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
