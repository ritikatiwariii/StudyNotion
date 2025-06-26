//creat a tags
//get all the tags-->used for courses throghnt thr tags we store our courses inside the particular tags
//create a tags
const Tag=require("../models/Tags");
exports.createTags=async(req,res)=>{
    try{
        //fetch the details from tags
        const {name,description}=req.body;
        //perform a validation which is neccessary
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"ALL FIELDS ARE REQUIRED"
            })
        }
        //then create the tags
        const tagDetails=await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetails);
        return res.status(200).json({
            success:true,
            message:"Tag is created successfully!"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating a tags!"
        })
    }
}
//getall the tags
exports.showAllTags=async(req,res)=>{
  //fetch the data from tags
  try{
    //find
    const allTags=await Tag.find({},{
        name:true,
        description:true
    })
    return res.status(200).json({
     success:true,
     message:"All Tags returned succesfully",
     allTags
    })
  }catch(err){
    return res.status(500).json({
        success:false,
        message:"Something Went Wromg!"
    })
  }
}

