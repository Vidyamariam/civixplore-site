import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    // Method to send OTP email
    async sendOTP(email, otp) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}`,
        });
    }
}
// Export a singleton instance of the email service
export const emailService = new EmailService();
