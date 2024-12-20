export class UpdateCustomerProfile {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(email, updatedData) {
        // Call the repository method with email and updated data
        const updatedCustomer = await this.customerRepository.updateProfile(email, updatedData);
        return updatedCustomer;
    }
}
