const Courses=require("../models/Courses");
const Tag=require("../models/Tags");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploder");
//createcoures
exports.createCourses=async(req,res)=>{
  try{

  }catch(err){
    return res.status(500).json({
        
    })
  }
}



//getall courses