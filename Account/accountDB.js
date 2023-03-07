"use strict"
import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:[5,"Account Validation Failed : Account name should be atleast 5 character long !"],
        maxlength:[25,"Account Validation Failed : Account name should be atmost 5 character long !"],
        required:[true,"Account Validation Failed : Account name is required !"],
    },
    userName:{
        type:String,
        minlength:[5,"Account Validation Failed : Account name should be atleast 5 character long !"],
        maxlength:[25,"Account Validation Failed : Account name should be atmost 5 character long !"],
        required:[true,"Account Validation Failed : Account name is required !"],
        unique:true
    }
})