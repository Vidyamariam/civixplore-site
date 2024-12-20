import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../database/mongo/connection.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import clientRoutes from "./routes/client/clientRoutes.js";
import engineerRoutes from "./routes/engineer/engineerRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import "express-async-errors";
dotenv.config();
const app = express();
// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
    origin: "http://localhost:3000", // Frontend origin
    credentials: true, // Allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/server/auth", authRoutes);
app.use("/server/admin", adminRoutes);
app.use("/server/client", clientRoutes);
app.use("/server/engineer", engineerRoutes);
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
