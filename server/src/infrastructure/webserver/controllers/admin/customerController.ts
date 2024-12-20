import { Request, Response, NextFunction } from "express";
import { MongoAdminRepository } from "../../../database/mongo/admin/mongoAdminRepository.js";
import { ApproveUserUseCase } from "../../../../application/useCases/admin/userApproval.js";

const adminRepository = new MongoAdminRepository();
const approveUserUseCase = new ApproveUserUseCase(adminRepository);

export const getCustomerController = async (req:Request, res: Response)=> {

     try{
    const customers = await adminRepository.getCustomers();

    console.log("customers in contoller: ",customers);   

    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      customers,
    });

     }
     catch(error: any){
        console.error("Error in getCustomerController:", error.message);
        res.status(500).json({
          success: false,
          message: "Failed to fetch customers",
        });
     }
}

export const approveUserController =  async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    const result = await approveUserUseCase.execute(userId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in approveUser controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}