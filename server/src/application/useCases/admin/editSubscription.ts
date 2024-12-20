import { AdminRepository } from "../../../domain/repositories/AdminRepository.js";
import { SubscriptionPlan } from "../../../domain/interfaces/SubscriptionPlan.js";

export class editSubscription {
  constructor(private adminRepository: AdminRepository) {}

  async execute(
    id: string,
    updatedPlan: Partial<SubscriptionPlan>
  ): Promise<{ success: boolean; message: string; data?: SubscriptionPlan }> {
    try {
      // Validate the input
      if (!id) {
        return { success: false, message: "Subscription ID is required" };
      }

      if (!Object.keys(updatedPlan).length) {
        return { success: false, message: "Updated plan details are required" };
      }

      // Call the repository to update the subscription plan
      const result = await this.adminRepository.updateSubscriptionPlan(id, updatedPlan);

      if (!result) {
        return { success: false, message: "Subscription plan not found" };
      }

      // Return the updated subscription plan data
      return result;
    } catch (error) {
      console.error("Error in EditSubscription use case:", error);
      return {
        success: false,
        message: "Failed to update subscription plan",
      };
    }
  }
}
