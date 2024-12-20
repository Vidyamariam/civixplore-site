
export interface SubscriptionPlan{
  id?: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: {
    callDurationLimit: number; // in minutes
    numberOfParticipants: number;
    numberOfCalls: number; // Per billing cycle
  };
  billingCycle: string[]; // ["monthly", "yearly"]
  discountForYearly: number; 
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}