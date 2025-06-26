//auth
const jwt=require("jsonwebtoken")
require("dotenv").config();
const User=require("../models/User")

exports.auth=async(req,res,next)=>{
    //fetch the token 
    try{
    const token=req.cookies.token|| req.body.token ||req.header["authorization"].replace("Bearer ","")
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token is Missing!"
        })
    }
    //verify the token
    try{
const decode= jwt.verify(token,process.env.JWT_SECRET);
console.log('decode',decode);

req.user=decode;


}
catch(err){
     return res.status(401).json({
        return:false,
        message:"Invalid Token!"
     })
    }
    next();
}
catch(err){
  return res.status(401).json({
    return:false,
    message:"Something went wrong!"
  })
}
}
//isStudent
exports.isStudent=async(req,res,next)=>{
  try{
   if( req.user.accountType!=="Student"){
    return res.status(401).json({
        success:false,
        message:"This is a protected route of student only"
    })
   }
   next();
  }catch(err){
    return res.status(500).json({
        sucess:false,
        message:"User role can not be verify"
    })
  }
}


//isInstructor
exports.isInstructor=async(req,res,next)=>{
  try{
   if( req.user.accountType!=="Instructor"){
    return res.status(401).json({
        success:false,
        message:"This is a protected route of Instructor only"
    })
   }
   next();
  }catch(err){
    return res.status(500).json({
        sucess:false,
        message:"User role can not be verify"
    })
  }
}
//isadmin
exports.isAdmin=async(req,res,next)=>{
  try{
   if( req.user.accountType!=="Admin"){
    return res.status(401).json({
        success:false,
        message:"This is a protected route of Admin only"
    })
   }
   next();
  }catch(err){
    return res.status(500).json({
        sucess:false,
        message:"User role can not be verify"
    })
  }
}