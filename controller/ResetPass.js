//forgot pass -->link generate->mail->openui->enter a newpass
const User=require("../models/User");
const bcrypt=require("bcrypt")
const mailSender=require("../utils/mailSender")
const crypto=require("crypto")
exports.resetPasswordToken=async(req,res)=>{
 //fetch the mail
 try{
 const {email}=req.body;
 //check the email,email 
 // validation,user exist for this email
 const user=await User.findOne({email});
 if(!user){
    return res.json({
        success:false,
        message:"Your email is not registerd!"
    })
 }
 //generate a unique token
 const token =crypto.randomUUID();
 //update user by adding token and expiration time
 const updatedDetails=await User.findOneAndUpdate({email},{
    token:token,
    resetPasswordExpirationtime:Date.now()+5*60*1000,
 },{new:true},//return a updated doc
)

 //link generate-->frontend link
 const url=`http://localhost:3000/update-password/${token}`
 //it will generate a differnt differnt frontend link for differnt different user
//send a mail
await mailSender(email,`Password Reset Link`,`password reset link->${url}`)
//return response
return res.json({
    success:true,
    message:"Email send successfully please check your email"
})
 }catch(err){
    return res.status(500).json({
        success:false,
        message:"Something went wrong!Please try again later"
    })
 }
}
//reset the pass
exports.resetPassword=async(req,res)=>{
//fetch the data
try{
const {token,password,confirmPassword}=req.body;

//validation
if(password!==confirmPassword){
    return res.json({
        sucess:false,
        message:"password and Confirmpassword are not matching!"
    })
}
//get userdetails from db using token
const userDetails=await User.findOne({token:token})
if(!userDetails){
    return res.json({
        success:false,
        message:"Token is invalid"
    })
}
//it means token is expire
if(userDetails.resetPasswordExpirationtime < Date.now()){
 return res.json({
    sucess:false,
    message:"Token is Expire.Regenerate the token !"
 })
}
//
//if token is missing->invalid token
//expiration time->check
//hash the password
const hashedPassword=await bcrypt.hash(password,10);
//update in db
const update=await User.findByIdAndUpdate({token:token},
    { 
        password:hashedPassword
    },{
        new:true
    }
)
//res return
return res.status(200).jso({
   success:true,
   message:"Password Reset Successfully!"
})
}catch(err){
    return res.status(500).json({
        success:false,
        message:"Something went wrong while reset the password!"
    })
}
}