const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
     type:String,
     required:true

    },
    token:{
    type:String
    },
    resetPasswordExpirationtime:{
    type:Date
    },
    accountType:{
        type:String,
        enum:["Student","Instructor","Admin"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    courses:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Courses"  ,
          required:true
        }
    ],
    image:{
        type:String,
        trim:true
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courseprogress"
    }]


});
module.exports=mongoose.model("User",userSchema)