import { Request, Response } from "express";
import { MongoUserRepository } from "../../../database/mongo/mongoUserRepository.js";
import { MongoEngineerRepository } from "../../../database/mongo/mongoEngineerRepository.js";
import { Types } from "mongoose";

const userRepository = new MongoUserRepository();
const engineerRepository = new MongoEngineerRepository();


export const getGroupedCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
      // Fetch grouped categories using the repository method
      const groupedCategories = await userRepository.getGroupedCategories();

      // console.log("grouped categories: ",groupedCategories);;
      
      res.status(200).json(groupedCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching grouped categories" });
    }
  };

  export const engineerOnboardingController = async (req: Request, res: Response): Promise<void> => {
    try {
      const email = req.body.email; // Email from the FormData
      const role = req.body.role;
      const projectType = req.body.projectType;
      const experience = parseFloat(req.body.experience); // Ensure numeric conversion
      const linkedInUrl = req.body.linkedInUrl;
      const hourlyRate = parseFloat(req.body.hourlyRate); // Ensure numeric conversion
      const location = req.body.location;
  
      // Parse JSON strings for skills and certifications
      const skills = JSON.parse(req.body.skills);
      const certifications = JSON.parse(req.body.certifications);
  
      // Extract the uploaded file (if any) from multer
      const resumeFile = req.file;

      const userId = await engineerRepository.getUserIdByEmail(email);
    if (!userId) {
       res.status(404).json({ message: "User not found for the provided email." });
    }

        // Determine if the engineer is a fresher based on experience
    const isFresher = experience === 0;
  
      // Construct the engineer object
      const engineerData = {
        userId: new Types.ObjectId(userId),
        role,
        projectType,
        experience,
        isFresher,
        linkedInUrl,
        hourlyRate,
        location,
        skills,
        certifications,
        resumeUrl: resumeFile ? `/uploads/resumes/${resumeFile.filename}` : null, // Attach resume file URL if available
      };
  
      // Submit the onboarding form using the repository
      const result = await engineerRepository.submitOnboardingForm(email, engineerData);
  
      // Respond with the result
      res.status(201).json({
        message: "Engineer onboarded successfully.",
        engineer: result,
      });
    } catch (error) {
      console.error("Error during engineer onboarding:", error);
      res.status(500).json({ message: "Error onboarding engineer." });
    }
  };

