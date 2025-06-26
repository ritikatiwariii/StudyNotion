const nodemailer=require("nodemailer");
const mailSender=async(title,email,body)=>{
try{
  let transporter=nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
      user:process.env.MAIL_USER,
      pass:process.env.MAIL_PASS,
    }
  })
  //mail send
  let info = await transporter.sendMail({
    from:`Ritika Tiwari-->Studynotion`,
    to:`${email}`,
    subject:`${title}`,
    html:`${body}`
  })
  console.log('info',info);

  
}catch(err){
    console.log(err.message);
    
    
}
}
module.exports=mailSender