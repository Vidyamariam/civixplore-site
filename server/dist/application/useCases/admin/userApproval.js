export class ApproveUserUseCase {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute(id) {
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
