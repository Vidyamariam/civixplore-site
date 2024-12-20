import { Admin } from "../interfaces/Admin.js";
import { Category } from "../interfaces/Category.js";
import { User } from "../interfaces/User.js";
import { SubscriptionPlan } from "../interfaces/SubscriptionPlan.js";

export interface AdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
  // createAdmin(admin: Admin): Promise<{ success: boolean; message: string }>;
  loginAdmin(
    email: string,
    password: string
  ): Promise<{ success: true; message: string; token: string } | { success: false; message: string }>;

  addCategory(category: Category): Promise<{ success: boolean; message: string; data?: Category }>;

  getCategories(): Promise<Category[]>; 

  updateCategory(
    id: string,
    updatedCategory: Partial<Category>
  ): Promise<{ success: boolean; message: string }>;

  deleteCategory(id: string): Promise<{ success: boolean; message: string }>;

  getCustomers(): Promise<User[]>;
  
  approveUser(id: string): Promise<{ success: boolean; message: string }>;

  getEngineers(): Promise<User[]>;

  blockUser(id: string,  isBlocked: boolean): Promise<{ success: boolean; message: string }>; // Added method for blocking a user

  createSubscriptionPlan(
    plan: SubscriptionPlan
  ): Promise<{ success: boolean; message: string,  data?: SubscriptionPlan}>;

  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;

  updateSubscriptionPlan(
    id: string,
    updatedPlan: Partial<SubscriptionPlan>
  ): Promise<{ success: boolean; message: string, data?: SubscriptionPlan }>;

  deleteSubscriptionPlan(id: string): Promise<{ success: boolean; message: string }>;


}