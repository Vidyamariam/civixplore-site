export class AddCategoryUseCase {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute(category) {
        if (!category.name.trim() || !["projectType", "role"].includes(category.type)) {
            return { success: false, message: "Invalid category data" };
        }
        try {
            const result = await this.adminRepository.addCategory(category);
            return result;
        }
        catch (error) {
            console.error("Error in AddCategoryUseCase:", error);
            return { success: false, message: "Failed to add category" };
        }
    }
}
