const mongoose=require("mongoose")
require("dotenv").config();
exports.connect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedToplogy:true,
    })
    .then(()=>{
        console.log('DB connection is successful');
        
    })
    .catch((err)=>{
        console.log('DB connection is failed !Please try again later');
        console.error(err);
        process.exit(1);
        
        
    })
};