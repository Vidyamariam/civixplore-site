import { AdminRepository } from "../../../domain/repositories/AdminRepository.js";
import { User } from "../../../domain/interfaces/User.js";

export class ApproveUserUseCase {
    constructor(private adminRepository: AdminRepository) {}
  
    async execute(id: string): Promise<{ success: boolean; message: string }> {
      if (!id) {
        return { success: false, message: "User ID is required" };
      }
  
      const result = await this.adminRepository.approveUser(id);
  
      if (!result.success) {
        return { success: false, message: result.message };
      }
  
      return { success: true, message: "User approved successfully" };
    }
  }
  
  export default ApproveUserUseCase;