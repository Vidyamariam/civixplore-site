export class deleteSubscription {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute(id) {
        try {
            // Validate the ID
            if (!id) {
                return { success: false, message: "Subscription ID is required" };
            }
            // Call the repository method to delete the subscription plan
            const result = await this.adminRepository.deleteSubscriptionPlan(id);
            // Return the result
            return result;
        }
        catch (error) {
            console.error("Error in DeleteSubscription use case:", error);
            return {
                success: false,
                message: "Failed to delete subscription plan",
            };
        }
    }
}
