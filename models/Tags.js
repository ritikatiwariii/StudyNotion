const mongoose=require("mongoose");
const tagsSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true,
    trim:true
   },
   description:{
    type:String,
    required:true,
    trim:true
    
   },
   course:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Course"
   
   }]
})
module.exports=mongoose.Schema("Tags",tagsSchema)