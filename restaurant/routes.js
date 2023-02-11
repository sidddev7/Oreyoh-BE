import  express  from "express";
import { CreateNewRestaurant,UpdateRestaurantById,DeleteRestaurantById,GiveReviewAndRatingById } from "./controllers.js";

const RestaurantRouter = express.Router();

// Create New Restaurant
RestaurantRouter.post('new',CreateNewRestaurant);

// Update Restaurant
RestaurantRouter.put('update/:id',UpdateRestaurantById);

// Delete Restaurant
RestaurantRouter.delete('delete/:id',DeleteRestaurantById);

// Restaurant Give Rating and Review
RestaurantRouter.post('rr/:id',GiveReviewAndRatingById);

export default RestaurantRouter;