"use strict"
import mongoose from "mongoose"

const accountMongooseSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:[5,"Account validation failed : Account name should be atleast 5 character long!"],
        maxlength:[25,"Account validation failed : Account name should be atmost 5 character long!"],
        required:[true,"Account validation failed : Account name is required!"],
    },
    userName:{
        type:String,
        minlength:[5,"Account validation failed : Account username should be atleast 5 character long!"],
        maxlength:[25,"Account validation failed : Account username should be atmost 5 character long!"],
        required:[true,"Account validation failed : Account username is required!"],
        unique:true
    },
    email:{
        type:String,
        minlength:[6,"Account validation failed : Account email should be atleast 6 character long!"],
        maxlength:[254,"Account validation failed : Account email should be atmost 254 character long!"],
        required:[true,"Account validation failed : Account email is required!"]
    },
    password:{
        type:String,
        minlength:[8,"Account validation failed : Account password should be atleast 5 character long!"],
        maxlength:[50,"Account validation failed : Account password should be atmost 5 character long!"],
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d_@$!%*?&]{8,50}$/,'Account Validation Failed : Account password should contain atleat 8 characters and atmost 50 characters, atleast 1 uppercase, atleast 1 lowercase, atleast 1 number and 1 special character form [ _, @, $, !, %, *, ?, & ]!'],
        required:[true,"Account validation failed : Account password is required!"]
    },
    mobile:{
        type:String,
        match:[/((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g,'Account Validation Failed : Account mobile number is not in valid format!'],
        required:[true,"Account validation failed : Account mobile number is required!"]
    },
    profilePicUrl:{
        type:String,
    }
},{
    timestamps:true
})

const accountSchema=mongoose.model('Account',accountMongooseSchema);

export default accountSchema;