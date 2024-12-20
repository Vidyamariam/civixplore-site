import { Schema } from "mongoose";
import mongoose from "mongoose";
const SubscriptionPlanSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    monthlyPrice: { type: Number, required: true },
    yearlyPrice: { type: Number, required: true },
    features: {
        callDurationLimit: { type: Number, required: true }, // in minutes
        numberOfParticipants: { type: Number, required: true },
        numberOfCalls: { type: Number, required: true },
    },
    billingCycle: { type: [String], required: true, enum: ["monthly", "yearly"] },
    discountForYearly: { type: Number, default: 0 }, // Discount percentage for yearly plans
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const SubscriptionPlanModel = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);
export default SubscriptionPlanModel;
