
import express from "express";
import { loginController, resendOtpController, signupController, verifyOtpController } from "../controllers/authController.js";

const router = express.Router();
router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/verify-otp",verifyOtpController);
router.post("/resend-otp", resendOtpController);

export default router;