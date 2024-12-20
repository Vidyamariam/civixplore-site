export class resendOtp {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    ;
    async execute({ email }) {
        const result = await this.userRepository.resendOtp(email);
        return result;
    }
}
