import { User } from "../interfaces/User.js";
import { Project } from "../interfaces/Project.js";
import { Response } from "express";

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<{ message: string }>;
    verifyOtp(email: string, enteredOtp: string): Promise<{message: string}>;
    resendOtp(email: string): Promise<{ message: string }>;
    getGroupedCategories(): Promise<{
      projectTypes: string[];
      roles: string[];
    }>;

    submitOnboardingForm(data: {
      email: string; 
      project: Project; 
    }): Promise<{ message: string }>;

    userLogin(
      email: string,
      password: string,
      res: Response
    ): Promise<
    { success: true; token: string, user: User } | { success: false; message: string }
  > ;


  };

