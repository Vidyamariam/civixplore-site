import { CustomerRepository } from "../../../domain/repositories/customerRepository.js";
import { Customer } from "../../../domain/interfaces/Customer.js";

export class UpdateCustomerProfile {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(
    email: string,
    updatedData: Partial<Customer>
  ): Promise<Customer> {
    // Call the repository method with email and updated data
    const updatedCustomer = await this.customerRepository.updateProfile(
      email,
      updatedData
    );

    return updatedCustomer;
  }
}
