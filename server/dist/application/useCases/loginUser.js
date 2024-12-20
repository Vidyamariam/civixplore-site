export class LoginUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, password, res }) {
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
