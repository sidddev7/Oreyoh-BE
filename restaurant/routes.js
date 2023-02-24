import express from "express";
import { CreateNewRestaurant, UpdateRestaurantById, DeleteRestaurantById, GiveReviewAndRatingById } from "./controllers.js";
import { validateBody } from "../helpers/bodyValidationMiddleware.js";
import { restaurantValidationschema, RestaurantReviewRatingSchema } from "./validation.js";

const RestaurantRouter = express.Router();

// Create New Restaurant
RestaurantRouter.post('/create', validateBody(restaurantValidationschema), CreateNewRestaurant);

// Update Restaurant
RestaurantRouter.put('/update/:id', UpdateRestaurantById);

// Delete Restaurant
RestaurantRouter.delete('/delete/:id', DeleteRestaurantById);

// Restaurant Give Rating and Review
RestaurantRouter.post('/rr/:id', GiveReviewAndRatingById);

export default RestaurantRouter;