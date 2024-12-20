import { Request, Response } from "express";
import { UpdateCustomerProfile } from "../../../../application/useCases/customer/updateProfile.js";
import { CustomerRepository } from "../../../../domain/repositories/customerRepository.js";
import { CustomerRepositoryImpl } from "../../../database/mongo/mongoCustomerRepository.js";

const customerRepository = new CustomerRepositoryImpl();
const updateProfile  = new UpdateCustomerProfile(customerRepository);

export const updateProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, fullName, phoneNumber, location, additionalDetails } = req.body;

    // console.log("data in profile controller: ",req.body);
    // console.log("data in profile controller: ",req.file);

     if (!email) {
      throw new Error("Email is required.");
    }

    
    let profilePicture = null;

    if (req.file) {
       // Ensure the backend's base URL is correct
      profilePicture =req.file.filename;
    }
    

    const updatedData = {
      fullName,
      phoneNumber,
      location,
      additionalDetails,
      email,
      ...(profilePicture && { profilePicture }),
    };

    const updatedProfile = await updateProfile.execute(email, updatedData);

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfileController = async (req: Request, res: Response)=> {
   
  try{

    console.log("Received query:", req.query);

    const email = req.query.email as string; // Fetch email from the route parameter

  console.log("email in query: ",req.query);
  
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  // Fetch the customer profile from the repository
  const customerDetails = await customerRepository.getProfile(email);

  // Send the response back to the frontend
  res.status(200).json({
    message: "Customer profile fetched successfully",
    customerDetails,
  });
} catch (error: any) {
  console.error("Error fetching customer profile:", error.message);
  res.status(500).json({ message: error.message || "Internal Server Error" });
}
   
}