import express from "express";
import { adminLoginController, blockUserController } from "../../controllers/admin/authController.js";
import { addCategoryController, deleteCategoryController, editCategoryController, getCategoriesController } from "../../controllers/admin/categoryController.js";
import { getCustomerController } from "../../controllers/admin/customerController.js";
import { approveUserController } from "../../controllers/admin/customerController.js";
import { getEngineerController } from "../../controllers/admin/engineerController.js";
import { createSubscriptionPlanController, getSubscriptionsController, editSubscriptionController, deleteSubscriptionController } from "../../controllers/admin/subscriptionController.js";
const router = express.Router();
//post routes
router.post("/login", adminLoginController);
router.post("/add-category", addCategoryController);
router.post("/block-user/:id", blockUserController);
router.post("/subscription/create", createSubscriptionPlanController);
//get routes
router.get("/categories", getCategoriesController);
router.get("/customers", getCustomerController);
router.get("/engineers", getEngineerController);
router.get("/subscription", getSubscriptionsController);
//put routes
router.put("/update-category/:id", editCategoryController);
router.put("/approve/:id", approveUserController);
router.put("/subscription/:id", editSubscriptionController);
router.delete("/delete-category/:id", deleteCategoryController);
router.delete("/subscription/delete/:id", deleteSubscriptionController);
export default router;
