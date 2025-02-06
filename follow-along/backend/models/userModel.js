const mongoose=require("mongoose");

const adressSchema= new mongoose.Schema({
    country:{
        type:String,
        required:[true,"Please Provide Your Country"]
    },
    state:{
        type:String
    },
    pincode:{
        type:Number
    }
});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide Your Name"]
    },
    email:{
        type:String,
        required:[true,"Please Provide Your Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please Provide Your Password"]
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    adress:{
        type:adressSchema
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    isActivated:{
        type:Boolean,
        default:false
    }
});

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;