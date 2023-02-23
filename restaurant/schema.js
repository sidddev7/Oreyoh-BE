import mongoose from "mongoose";
import User from "../users/schema.js";

// check if user exist before creating post
const userExist = async (val) => {
    const ans = await User.exists({ _id: val });
    return ans;
}

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [5, "Restaurant Schema Error : Restaurant name should be minimum 5 character long !"],
        maxlength: [50, "Restaurant Schema Error : Restaurant name should be maximum 50 character long !"],
        required: [true, "Restaurant Schema Error : Restaurant name is required !"]
    },
    location: {
        type: String,
        minlength: [5, "Restaurant Schema Error : Restaurant location should be minimum 5 character long !"],
        maxlength: [200, "Restaurant Schema Error : Restaurant location should be maximum 200 character long !"],
        required: [true, "Restaurant Schema Error : Restaurant location is required !"]
    },
    phonenumber: {
        type: String,
        minlength: [10, "Restaurant Schema Error : Restaurant phonenumnber should be minimum 10 character long !"],
        unique: true,
        required: [true, "Restaurant Schema Error : Restaurant phonenumber is required !"]
    },
    menu: {
        type: [{
            menuName: {
                type: String,
                minlength: [5, "Restaurant Schema Error : Restaurant menu name should be minimum 5 character long !"],
                maxlength: [50, "Restaurant Schema Error : Restaurant menu name should be maximum 50 character long !"],
                required: [true, "Restaurant Schema Error : Restaurant menu name is required !"]
            },
            menuPrice: {
                type: Number,
                min: [0, "Restaurant Schema Error : Restaurant menu price cannot be less than 0 !"],
                required: [0, "Restaurant Schema Error : Restaurant menu price is required !"]
            },
            imageurl: {
                type: [String],
                required: [true, "Restaurant Schema Error : Restaurant image urls is required !"],
                validate: {
                    validator: v => Array.isArray(v) && v.length > 0,
                    message: "Restaurant Schema Error : Atleast one image url for the restaurant menu is required !"
                }
            },
        }]
    },
    ratings: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                required: [true, "Restaurant Schema Error : Restaurant Rating User-ID is required !"],
                validate: {
                    validator: userExist,
                    message: props => `Restaurant Schema Error : Restaurant Rating User with ID : ${props.value} does not exist !`
                }
            },
            rating: {
                type: Number,
                required: [true, "Restaurant Schema Error : Restaurant User Ratings Number is required !"],
                min: [0, "Restaurant Schema Error : Restaurant User Rating cannot be less than 0 !"],
                max: [5, "Restaurant Schema Error : Restaurant User Rating cannot be more than 5 !"]
            },
            review: {
                type: String,
                minlength: [5, "Restaurant Schema Error : Restaurant user review should be minimum 5 character long !"],
                maxlength: [200, "Restaurant Schema Error : Restaurant user review should be maximum 200 character long !"],
                required: [true, "Restaurant Schema Error : Restaurant user review is required !"]
            }
        }]
    },
    // subscriptionEndDate: {
    //     type: Date,
    //     requried: [true, "Restaurant Schema Error : Restaurant subscription end date is required !"]
    // }
}, { timestamps: true });

export default RestaurantSchema;