import { AdminRepository } from "../../../domain/repositories/AdminRepository.js";
import { Admin } from "../../../domain/interfaces/Admin.js";

export class LoginAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute({
    email,
    password,
    role,
  }: Admin): Promise<{ message: string; token?: string }> {
    // Attempt to log in using the repository method
    const loginResult = await this.adminRepository.loginAdmin(email, password);

    if (!loginResult.success) {
      // Handle failure case
      return { message: loginResult.message };
    }

    // Handle success case
    return {
      message: loginResult.message,
      token: loginResult.token,
    };
  }
}

export default LoginAdmin;
