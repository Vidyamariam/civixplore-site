import { MongoUserRepository } from "../../../database/mongo/mongoUserRepository.js";
const userRepository = new MongoUserRepository();
export const getGroupedCategoriesController = async (req, res) => {
    try {
        // Fetch grouped categories using the repository method
        const groupedCategories = await userRepository.getGroupedCategories();
        // console.log("grouped categories: ",groupedCategories);;
        res.status(200).json(groupedCategories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching grouped categories" });
    }
};
export const submitOnboardingFormController = async (req, res) => {
    const { email, project } = req.body; // Extract user and project data from the request body
    console.log("Data passed to submitOnboardingForm:", req.body);
    try {
        // Call the repository method to handle the onboarding form submission
        const result = await userRepository.submitOnboardingForm({ email, project });
        // Return the response to the client based on the result from the repository
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error during onboarding:", error);
        res.status(500).json({ message: "An error occurred during onboarding. Please try again." });
    }
};
