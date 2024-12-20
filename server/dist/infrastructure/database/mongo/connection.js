import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/CIVIXPLORE");
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};
export default connectDB;
