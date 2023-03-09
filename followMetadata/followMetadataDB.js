"use strict"
import mongoose from "mongoose"

const followMetadataSchema=new mongoose.Schema({
    // account_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Account"
    // },
    followers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Account",
        min:[0,"Follow Metadata failed: Account should have atleast 0 followers"],
    },
    following:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Account",
        min:[0,"Follow Metadata failed: Account should have atleast 0 following"],
    },
    blacklistAccount:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Account",
        min:[0,"Follow Metadata failed: Account should have atleast 0 blacklisted account"],
    }
})

module.exports=followMetadataSchema=mongoose.model("FollowMetadataSchema",followMetadataSchema)
