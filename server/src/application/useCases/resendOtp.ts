import { UserRepository } from "../../domain/repositories/UserRepository.js";

interface resendOtpInput {
    email: string;
  }

export class resendOtp {

    constructor(private userRepository: UserRepository) {};

    async execute({ email}: resendOtpInput): Promise<{ message: string }> {
        
        const result = await this.userRepository.resendOtp(email);
        return result;
    }

}
