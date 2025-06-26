const mongoose=require("mongoose")
const courseProgress=new mongoose.Schema({
   courseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses"
    
   },
   completedVideo:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubSection"
   }]
});
module.exports=mongoose.model("Courseprogress",courseProgress)