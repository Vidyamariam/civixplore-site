import { AdminRepository } from "../../../domain/repositories/AdminRepository.js";
import { Category } from "../../../domain/interfaces/Category.js";

export class AddCategoryUseCase {
  private adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(category: Category): Promise<{ success: boolean; message: string }> {
    if (!category.name.trim() || !["projectType", "role"].includes(category.type)) {
      return { success: false, message: "Invalid category data" };
    }
    try {
      
      const result = await this.adminRepository.addCategory(category);
      return result;
    } catch (error) {
      console.error("Error in AddCategoryUseCase:", error);
      return { success: false, message: "Failed to add category" };
    }
  }
}
