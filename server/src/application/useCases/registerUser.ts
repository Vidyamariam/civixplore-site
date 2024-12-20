import { UserRepository } from "../../domain/repositories/UserRepository.js";
import { User } from "../../domain/interfaces/User.js";


export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password, role, isVerified,isApproved,status,isBlocked, otp }: User) {
    // Call createUser from userRepository and return the response
    const userCreationResponse = await this.userRepository.createUser({
      name,
      email,
      password,
      role,
      isVerified,
      isApproved,
      status,
      isBlocked,
      otp,
      
    });

    // Return the response to be sent to the client
    return userCreationResponse;
  }
}