export class verifyOtp {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    ;
    async execute({ email, enteredOtp }) {
        // Call the repository’s verifyOtp method
        const result = await this.userRepository.verifyOtp(email, enteredOtp);
        return result;
    }
}
