import { Admin } from "../domain/interfaces/Admin.ts";
import { User } from "../domain/interfaces/User.ts";

declare global {
  namespace Express {
    interface Request {
      admin?: Admin; // Add `admin` property to the Request object
      user?: {
        id: string;
        role: User["role"];
      };
    }
  }
}
