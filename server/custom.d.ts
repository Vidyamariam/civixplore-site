import { User } from "../server/src/domain/entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string }; // Add other properties as needed
      file?: {
        location?: string; // Property added by your upload handler (e.g., S3).
        [key: string]: any; // Allow additional dynamic properties if needed.
      };
    }
  }
}
  
  export {}; 