import mongoose from "mongoose";
import { statusCodes } from "../constants/status.js";
import Restaurant from "./schema.js";

// Creating New Restaurant
export const CreateNewRestaurant = async (req, res) => {
    try {
        const newRestaurant = Restaurant(req.body);
        let temp = await newRestaurant.save()
        return res.status(200).json({ success: 1, message: "Restaurant Created Successfully.", data: temp });
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(406).json({ success: 0, message: "Restaurant with the given name already exist.", data: null });
        }
        else {
            return res.status(statusCodes.internalServerError).json({ success: 0, message: err.message, data: null });
        }
    }
}

// Update Restaurant
export const UpdateRestaurantById = async (req, res) => {
    try {
        let tempRestaurant
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            // let update = await Offer.update({_id:new ObjectId(req.params.id)},{$set:{req.body}})
            tempRestaurant = await Restaurant.findById(req.params.id); // checking if offer with this id exist 
            if (tempRestaurant === null) {
                return res.status(404).json({ success: 0, message: "No restaurant with this ID available.",data:null});
            }
            else {
                tempRestaurant.name = req.body.name == undefined ? tempRestaurant.name : req.body.name;
                tempRestaurant.location = req.body.location == undefined ? tempRestaurant.location : req.body.location;
                tempRestaurant.phonenumber = req.body.phonenumber == undefined ? tempRestaurant.phonenumber : req.body.phonenumber;
                tempRestaurant.menu = req.body.menu == undefined ? tempRestaurant.menu : req.body.menu;
                tempRestaurant.ratings = req.body.ratings == undefined ? tempRestaurant.ratings : req.body.ratings;

                const tempResult = await tempRestaurant.save();
                res.status(200).json({ success: 1, message: "Restaurant Updated successfully.", data: tempResult })
            }
        }
        else {
            return res.status(400).json({ success: 0, message: "Invalid Restaurant-ID.", data: null });
        }
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(406).json({ success: 0, message: "Restaurant name should be Unique, This name is already in use." });
        }
        else {
            return res.status(500).json({ success: 0, message: err.message, data: null });
        }
    }
}

// Delete Restaurant
export const DeleteRestaurantById = async (req, res) => {
    try {
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            tempRestaurant = await Restaurant.findById(req.params.id); // checking if Product with this id exist 
            if (tempRestaurant == null) {
                return res.status(404).json({ success: 0, message: "No Restaurant with this ID available." });
            }
            else {
                await tempRestaurant.remove();
                res.status(200).json({ success: 1, message: "Restaurant deleted successfully.", data: null })
            }
        }
        else {
            return res.status(400).json({ success: 0, message: "Invalid Restaurant-ID.", data: null });
        }
    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ success: 0, message: err.message, data: null });
    }
}

// Give Review & Rating
export const GiveReviewAndRatingById = async (req, res) => {
    try {
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            let tempRestaurant = await Restaurant.findById(req.params.id); // checking if Product with this id exist 
            if (tempRestaurant == null) {
                return res.status(404).json({ success: 0, message: "No Restaurant with this ID available." });
            }
            else {
                const { user, rating, review } = req.body;
                if (!mongoose.isValidObjectId(req.params.id)) {
                    return res.status(400).json({ success: 0, message: "Invalid User-ID.", data: null });
                }
                let tempRatings = tempRestaurant.ratings;
                let finalRatings = [...tempRatings, ...[user, rating, review]];
                tempRestaurant.rating = finalRatings;
                const results = tempRestaurant.save();
                res.status(200).json({ success: 1, message: "Restaurant ratings updated successfully.", data: tempRestaurant })
            }
        }
        else {
            return res.status(400).json({ success: 0, message: "Invalid Restaurant-ID.", data: null });
        }
    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}