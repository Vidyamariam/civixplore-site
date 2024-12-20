import { MongoAdminRepository } from "../../../database/mongo/admin/mongoAdminRepository.js";
const adminRepository = new MongoAdminRepository();
export const getEngineerController = async (req, res) => {
    try {
        const engineers = await adminRepository.getEngineers();
        //  console.log("engineers in contoller: ",engineers);
        res.status(200).json({
            success: true,
            message: "Engineers fetched successfully",
            engineers,
        });
    }
    catch (error) {
        console.error("Error in getEngineerController:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Engineers",
        });
    }
};
