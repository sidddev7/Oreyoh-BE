"use strict"
import mongoose from "mongoose"

const paidPostSchema=new mongoose.Schema({
    // account_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Account"
    // },
    postName:{
        type:String,
        minlength:[3,"Post validation failed: Post name should be atleast 3 character long!"],
        maxlength:[50,"Post validation failed: Post name should be atmost 50 character long!"],
        required:[true,"Post validation failed: Post name is required!"]
    },
    postDescription:{
        type:String,
        maxlength:[255,"Post validation failed: Post name should be atmost 255 character long!"],
    },
    image:{
        type:[String],
        validate:{
            validator:v => Array.isArray(v) && v.length > 0,
            message:"Atleast one image for the Post is required!"
        },
        required:[true,"Post validation failed: Post image is required!"]
    },
    // postComment:{

    // },
    likeCount:{
        type:Number,
        min:[0,"Post validation failed: Post like should be atleast 0!"]
    },
    dislikeCount:{
        type:Number,
        min:[0,"Post validattion failed: Post like should be atleast 0!"]
    },
    productLink:{
        type:String,
        min:[6,"Post validation failed: Post product link should be atleast 6!"],
        max:[255,"Post validation failed: Post product link should be atleast 255!"]
    },
    price:{
        type:Number,
        min:[1,"Post validation failed: Post product proce length should be atleast 1!"],
    }
},{timestamps:true})

module.exports=paidPostSchema=mongoose.model("PaidPostSchema",paidPostSchema)
