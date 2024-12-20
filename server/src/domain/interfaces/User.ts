export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "engineer" | "admin";
  isVerified: boolean;
  isApproved: boolean;
  status: string; 
  isBlocked: boolean;
  otp?: string | null;
}
