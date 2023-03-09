import mongoose from "mongoose";

const accountMetadataMongooseSchema =new  mongoose.Schema({
    account_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account"
    },
    bio:{
        type:String,
        maxlength:[0,"Account metaData validation failed : Account Bio should be atmost 5 character long!"],
    },
    location:{
        addressLine:{
            type:String,
            minlength:[5,"Account metaData validation failed : Account location address line should be atleast 5 character long!"],
            maxlength:[45,"Account metaData validation failed : Account location address line should be atmost 45 character long!"],
            required:[true,"Account metaData validation failed : Account location address line is required!"]
        },
        city:{
            type:String,
            minlength:[3,"Account metaData validation failed : Account location city should be atleast 3 character long!"],
            maxlength:[30,"Account metaData validation failed : Account location city should be atmost 30 character long!"],
            required:[true,"Account metaData validation failed : Account location city is required!"]
        },
        state:{
            type:String,
            minlength:[3,"Account metaData validation failed : Account location state should be atleast 3 character long!"],
            maxlength:[25,"Account metaData validation failed : Account location state should be atmost 25 character long!"],
            required:[true,"Account metaData validation failed : Account location state is required!"] 
        },
        pincode:{
            type:String,
            minlength:[5,"Account metaData validation failed : Account location pincode should be atleast 5 character long!"],
            maxlength:[7,"Account metaData validation failed : Account location pincode should be atmost 7 character long!"],
            required:[true,"Account metaData validation failed : Account location pincode is required!"]
        },
    },
    follwerCount:{
        type:Number,
        default:0,
        min:[0,"Account metaData validation failed : Account follwer count should be postive integer"],
    },
    follwingCount:{
        type:Number,
        default:0,
        min:[0,"Account metaData validation failed : Account follwing count should be postive integer"],
    },
    verified:{
        type:Boolean,
        default:false,
        required:[true,"Account metaData validation failed : Account verification flag is required!"]
    },
    paidPostCount:{
        type:Number,
        default:0,
        min:[0,"Account metaData validation failed : Account paid post count should be postive integer"],
    },
    unPaidPostCount:{
        type:Number,
        default:0,
        min:[0,"Account metaData validation failed : Account un-paid count should be postive integer"],
    },
    contactEmail:{
        type:String,
        minlength:[6,"Account metaData validation failed : Account contact email should be atleast 6 character long!"],
        maxlength:[254,"Account metaData validation failed : Account contact email should be atmost 254 character long!"],
        required:[true,"Account metaData validation failed : Account contact email is required!"]
    },
    contactPhone:{
        type:String,
        match:[/((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g,'Account metaData validation failed : Account contact phone number is not in valid format!'],
        required:[true,"Account metaData validation failed : Account contact phone number is required!"]
    },
    businessLink:{
        type:String,
    },
    rating:{
        type:Number,
        default:0,
        min:[0,"Account metaData validation failed : Account rating should be more than equal to 0"],
        max:[5,"Account metaData validation failed : Account rating should be less than or eqaul to 5"],
    }

},{
    timestamps:true
})

const accountMetadataSchema=mongoose.model('Account',accountMetadataMongooseSchema);

export default accountMetadataSchema;