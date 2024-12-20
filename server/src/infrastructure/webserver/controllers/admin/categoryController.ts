import { Request, Response, NextFunction } from "express";
import { AddCategoryUseCase } from "../../../../application/useCases/admin/addCategory.js";
import { MongoAdminRepository } from "../../../database/mongo/admin/mongoAdminRepository.js";

// Initialize necessary components
const adminRepository = new MongoAdminRepository();

console.log('Instantiating AddCategoryUseCase');
const addCategoryUseCase = new AddCategoryUseCase(adminRepository);
console.log('AddCategoryUseCase instantiated:', addCategoryUseCase);

// Single controller function to add category
export const addCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type, name } = req.body;

    console.log("Received category data:", req.body);

    if (!type || !name) {
      res.status(400).json({ success: false, message: "Type and name are required." });
      return;
    }

    const category = { type, name };
    const result = await addCategoryUseCase.execute(category);

    console.log("Category add result:", result);

    res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    console.error("Error in addCategory:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCategoriesController = async (req:Request, res:Response)=> {

   try{
      const categories = await adminRepository.getCategories();
         
      // console.log("categories present: ",categories);
      
       res.status(200).json({success:true, data: categories});
   }catch(error: any){
    console.error("Error in getCategoriesController:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch categories" });

   }
}


export const editCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, name } = req.body;

    console.log("id: ",req.params);
    
    console.log("req body: ",req.body);
    

    if (!id || !type || !name) {
      res.status(400).json({ success: false, message: "Invalid input data" });
      return;
    }

    const updatedCategory = await adminRepository.updateCategory(id, { type, name });

    console.log("updated category: ",updatedCategory);

    if (updatedCategory.success) {
      res.status(200).json({ success: true, message: "Category edited successfully" });
    }else {
      res.status(404).json({ success: false, message: updatedCategory.message });
    }

  } catch (error: any) {
    console.error("Error in editCategoryController:", error.message);
    next(error); // Pass the error to the next middleware
  }
};

export const deleteCategoryController = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    const { id } = req.params; // Extract category ID from URL parameters

    // Validate input
    if (!id) {
      res.status(400).json({ success: false, message: "Category ID is required" });
    }

    const deletedCategory = await adminRepository.deleteCategory(id);

    if (deletedCategory.success) {
      res.status(200).json({ success: true, message: "Category deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: deletedCategory.message });
    }
  } catch (error: any) {
    console.error("Error in deleteCategoryController:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete category" });
  }
};
