import express from "express";
import { engineerOnboardingController, getGroupedCategoriesController } from "../../controllers/engineer/onboardController.js";
import { upload } from "../../../middleware/Multer.js";

const router = express.Router();

router.get("/categories-grouped",getGroupedCategoriesController);

router.post("/onboarding",upload.single("resume"), engineerOnboardingController)

export default router;