import mongoose, { Schema } from "mongoose";
const CustomerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User", // Refers to the User model
        required: true,
    },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    additionalDetails: { type: String },
    profilePicture: { type: String, default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
// Export the Customer model
export default mongoose.model("Customer", CustomerSchema);
