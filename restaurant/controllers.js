import mongoose from "mongoose";
import RestaurantSchema from "./schema.js";

// Creating New Restaurant
export const CreateNewRestaurant = async (req, res) => {
    try {
        
    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}

// Update Restaurant
export const UpdateRestaurantById= async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}

// Delete Restaurant
export const DeleteRestaurantById= async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}

// Give Review & Rating
export const GiveReviewAndRatingById= async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}