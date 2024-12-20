import { MongoUserRepository } from "../../database/mongo/mongoUserRepository.js";
import { LoginUser } from "../../../application/useCases/loginUser.js";
import { RegisterUser } from "../../../application/useCases/registerUser.js";
import { verifyOtp } from "../../../application/useCases/verifyOtp.js";
import { resendOtp } from "../../../application/useCases/resendOtp.js";
const userRepository = new MongoUserRepository();
const loginUser = new LoginUser(userRepository);
const registerUser = new RegisterUser(userRepository);
const VerifyOtp = new verifyOtp(userRepository);
const Resendotp = new resendOtp(userRepository);
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("req body in login: ", req.body);
        const result = await loginUser.execute({ email, password, res });
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
export const signupController = async (req, res) => {
    try {
        const userInput = req.body;
        const response = await registerUser.execute(userInput);
        res.status(200).json(response); // Send the response to the client
    }
    catch (error) {
        res.status(400).json({ message: error.message }); // Send error response
    }
};
export const verifyOtpController = async (req, res) => {
    try {
        const { email, enteredOtp } = req.body;
        console.log("verifyOtp controller otp and email: ", email, enteredOtp);
        const result = await VerifyOtp.execute({ email, enteredOtp });
        console.log("result: ", result);
        res.status(200).json(result);
    }
    catch (error) {
        // Handle errors (invalid OTP, expired token, etc.)
        res.status(400).json({ message: error.message });
    }
};
export const resendOtpController = async (req, res) => {
    try {
        console.log("Full URL:", req.originalUrl);
        console.log("Raw query:", req.query);
        const email = req.query.email;
        if (!email) {
            res.status(400).json({ message: "Email is required." });
            return;
        }
        console.log("Parsed email:", email);
        const result = await Resendotp.execute({ email });
        console.log("result in resend ot: ", result);
        res.status(200).json(result); // Send success message
    }
    catch (error) {
        // Handle errors (invalid OTP, expired token, etc.)
        res.status(400).json({ message: error.message });
    }
};
