// const mongoose = require("mongoose");
import mongoose from "mongoose";
import User from "../users/schema.js";

// check if user exist before creating post
const userExist=async(val)=>{
    const ans= await User.exists({_id:val});
    return ans;
}

// const Schema = mongoose.Schema;
// Create Schema
const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "Post Schema Error : User ID is required !"],
        validate: {
            validator: userExist,
            message: props => `Post Schema Error : No User with ID : ${props.value} exist !`
        }
    },

    caption: {
        type:String,
        minlength:[5,"Post Schema Error : Post Caption should be minimum 5 character long !"],
        maxlength:[100,"Post Schema Error : Post Caption should be maximum 100 character long !"],
    },

    mediaURLs:{
        type:[String],
        required:[true,"Post Schema Error : Post media URL is required !"],
        validate:{
            validator:v => Array.isArray(v) && v.length > 0,
            message:"Post Schema Error : Atleast one media URL for the Post is required !"
        } 
    },

    // restaurants: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'restaurants',
    //     // ref:'productCategory'
    //     required: [true, "Post Schema Error : Restaurants ID is required !"],
    //     validate: {
    //         validator: categoryExist,
    //         message: props => `Post Schema Error : No Restaurants with ID : ${props.value} exist !`
    //     }
    // },
}, { timestamps: true });
const Post = mongoose.model("posts", PostSchema);
export default Post;
