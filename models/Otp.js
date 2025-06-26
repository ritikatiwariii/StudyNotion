const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema=new mongoose.Schema({
    email:{
     type:String,
     required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});
//to send a email
async function sendverificationEmail(email,otp){
 try{
  const mailresponse=await mailSender(email,"Verification Email from StudyNotion",otp);
  console.log('Email send successfully',mailresponse);
  
 }catch(err){
    console.log("error occured while sending mail",err);
    
 }
} 
otpSchema.pre("save",async function(next){
    await sendverificationEmail(this.email,this.otp),
    next()
})

module.exports=mongoose.model("Otp",otpSchema);