import { UserRepository } from "../../domain/repositories/UserRepository.js";
import { User } from "../../domain/interfaces/User.js";

interface VerifyOtpInput {
    email: string;
    enteredOtp: string;
  }

export class verifyOtp {

    constructor(private userRepository: UserRepository) {};

    async execute({ email, enteredOtp }: VerifyOtpInput): Promise<{ message: string }> {
        // Call the repository’s verifyOtp method
        const result = await this.userRepository.verifyOtp(email, enteredOtp);
        return result;
    }

}