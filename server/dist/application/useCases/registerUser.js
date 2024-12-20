export class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ name, email, password, role, isVerified, isApproved, status, isBlocked, otp }) {
        // Call createUser from userRepository and return the response
        const userCreationResponse = await this.userRepository.createUser({
            name,
            email,
            password,
            role,
            isVerified,
            isApproved,
            status,
            isBlocked,
            otp,
        });
        // Return the response to be sent to the client
        return userCreationResponse;
    }
}
