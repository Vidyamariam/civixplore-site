import express from "express";
import { getGroupedCategoriesController, submitOnboardingFormController } from "../../controllers/customer/onboardController.js";
import { getProfileController, updateProfileController } from "../../controllers/customer/profileController.js";
import { upload } from "../../../middleware/Multer.js";
import { verifyUser } from "../../../middleware/verifyUser.js";


const router = express.Router();

router.get("/categories-grouped", getGroupedCategoriesController);

router.post("/onboarding", submitOnboardingFormController);

router.post("/profile", verifyUser(), upload.single("profileImage"), updateProfileController);

router.get("/profile",verifyUser(), getProfileController);

export default router;