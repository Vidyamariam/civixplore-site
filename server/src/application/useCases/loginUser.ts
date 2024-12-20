import { UserRepository } from "../../domain/repositories/UserRepository.js";
import bcrypt from "bcrypt";
import { Response } from "express";

interface LoginUserInput {
  email: string;
  password: string;
  res: Response;
}

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password, res }: LoginUserInput) {
    const result = await this.userRepository.userLogin(email, password, res);

    if (result.success === false) {
      throw new Error(result.message); // Throw the error message from the result
    }

    // Step 3: Check if the user is blocked
    if (result.user.isBlocked) {
      throw new Error("Your account is blocked. Please contact support.");
    }

    return {
      message: "Login successful",
      user: result.user,
      token: result.token
    };
  }
}