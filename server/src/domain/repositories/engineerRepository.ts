import { Engineer } from "../interfaces/Engineer.js";
import { User } from "../interfaces/User.js";

export interface EngineerRepository{

    submitOnboardingForm(email: string, engineer: Engineer): Promise<Engineer | { message: string }>;

    getUserIdByEmail(email: string): Promise<string> ;
}