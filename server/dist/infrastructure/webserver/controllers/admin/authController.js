import { MongoAdminRepository } from "../../../database/mongo/admin/mongoAdminRepository.js";
import LoginAdmin from "../../../../application/useCases/admin/adminLogin.js";
const adminrepository = new MongoAdminRepository();
const adminLogin = new LoginAdmin(adminrepository);
export const adminLoginController = async (req, res, next) => {
    try {
        // Extract data from the request body
        const { email, password, role } = req.body;
        console.log("Request data: ", req.body);
        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: "Email and password is required" });
        }
        if (role !== "admin") {
            res.status(403).json({ message: "Access denied. Invalid role." });
        }
        // Execute the use case
        const result = await adminLogin.execute({ email, password, role });
        // Send response back to the client
        if (result.token) {
            // Send JWT token as a cookie
            res.cookie("auth_token", result.token, {
                httpOnly: true,
                maxAge: 3600000, // 1 hour
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            res.status(200).json({ message: result.message, token: result.token });
        }
        else {
            res.status(401).json(result);
        }
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
export const blockUserController = async (req, res, next) => {
    try {
        let { id } = req.params;
        const { isBlocked } = req.body;
        console.log("id in params: ", id);
        console.log("Current block status:", isBlocked);
        id = id.trim();
        console.log("Sanitized id in params: ", id);
        if (!id) {
            res.status(400).json({ message: "User ID is required" });
        }
        // Use the repository to block the user
        const result = await adminrepository.blockUser(id, isBlocked);
        if (result.success) {
            res.status(200).json({ message: result.message });
        }
        else {
            res.status(404).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
