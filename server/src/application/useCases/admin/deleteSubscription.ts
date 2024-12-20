import { AdminRepository } from "../../../domain/repositories/AdminRepository.js";

export class deleteSubscription{
  constructor(private adminRepository: AdminRepository){}

  async execute(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validate the ID
      if (!id) {
        return { success: false, message: "Subscription ID is required" };
      }

      // Call the repository method to delete the subscription plan
      const result = await this.adminRepository.deleteSubscriptionPlan(id);

      // Return the result
      return result;
    } catch (error) {
      console.error("Error in DeleteSubscription use case:", error);
      return {
        success: false,
        message: "Failed to delete subscription plan",
      };
    }
  }

}