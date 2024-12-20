export class LoginAdmin {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute({ email, password, role, }) {
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
