import { MongoAdminRepository } from "../../../database/mongo/admin/mongoAdminRepository.js";
import { editSubscription } from "../../../../application/useCases/admin/editSubscription.js";
import { deleteSubscription } from "../../../../application/useCases/admin/deleteSubscription.js";
const adminrepository = new MongoAdminRepository();
const EditSubscription = new editSubscription(adminrepository);
const deleteSubscriptionUseCase = new deleteSubscription(adminrepository);
export const createSubscriptionPlanController = async (req, res, next) => {
    try {
        // Extract the subscription plan details from the request body
        const { plan } = req.body;
        console.log("plan details: ", req.body);
        // Validate the incoming data
        if (!plan.name || !plan.description || !plan.monthlyPrice || !plan.yearlyPrice || !plan.features) {
            res.status(400).json({ success: false, message: "All fields are required." });
        }
        // Delegate to the repository
        const result = await adminrepository.createSubscriptionPlan(plan);
        if (result.success) {
            res.status(201).json(result); // 201 Created
        }
        else {
            res.status(400).json(result); // 400 Bad Request
        }
    }
    catch (error) {
        console.error("Error in createSubscriptionPlan:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the subscription plan.",
        });
    }
};
export const getSubscriptionsController = async (req, res) => {
    try {
        const subscriptions = await adminrepository.getSubscriptionPlans();
        // console.log("fetched subscriptions: ",subscriptions);
        res.status(200).json({
            success: true, message: "subscriptions fetched successfully", subscriptions
        });
    }
    catch (error) {
        console.error("Error in getSubscriptionsController:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch subscriptions",
        });
    }
};
export const editSubscriptionController = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract ID from URL params
        const updatedPlan = req.body; // Extract the updated plan details from the request body
        console.log("subscription id: ", req.params);
        console.log("updated fields: ", req.body);
        if (!id) {
            res.status(400).json({ success: false, message: "ID is required" });
        }
        if (!Object.keys(updatedPlan).length) {
            res
                .status(400)
                .json({ success: false, message: "Updated plan details are required" });
        }
        // Call the repository function to update the plan
        const result = await EditSubscription.execute(id, updatedPlan);
        console.log("Repository Response: ", result);
        if (!result.success) {
            res.status(404).json(result); // Return 404 if the plan was not found
        }
        res.status(200).json(result); // Return the success response
    }
    catch (error) {
        console.error("Error in editSubscriptionController:", error);
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
export const deleteSubscriptionController = async (req, res) => {
    const { id } = req.params;
    const response = await deleteSubscriptionUseCase.execute(id);
    if (response.success) {
        res.status(200).json(response);
    }
    else {
        res.status(404).json(response);
    }
};
