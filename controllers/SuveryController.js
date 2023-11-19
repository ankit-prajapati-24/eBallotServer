const Survey = require("../models/Survey");
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require("dotenv").config();

const cloudinary = require('cloudinary').v2;

exports.CreateSurvey = async (req, res) => {
  try {
    console.log(req.body, req.files);
    const { Name, Details,Category ,Start_Date,End_Date} = req.body;
    const { Image, Video } = req.files;

    const imageUrl = await uploadToCloudinary(Image, process.env.FOLDER_NAME);
    const videoUrl = await uploadToCloudinary(Video, process.env.FOLDER_NAME);

    const payload = {
      Name: Name,
      Details: Details,
      Image: imageUrl.secure_url,
      Video: videoUrl.secure_url,
      Category:Category,
      Start_Date:Start_Date,
      End_Date:End_Date
    };

    const result = await Survey.create(payload);
    console.log(result);
    res.status(200).json({
      msg: "Survey created successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      msg: "Could not create Survey"
    });
  }
};

async function uploadToCloudinary(file, folderName) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: folderName,
        resource_type: "auto" // "auto" detects whether it's an image or video
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}


exports.AddLike = async (req, res) => {
    try {
      const { _id, email } = req.body;
      const result = await Survey.findOneAndUpdate({ _id: _id },
        { $push: { Likes:  email }  },
        { new: true });
      res.status(200).json({
        msg: "Survey Liked"
      });
    } catch (err) {
      res.status(400).json({
        msg: "Could not like Survey"
      });
    }
  };
  
  exports.AddUnlike = async(req,res) =>{
    try{
        const {_id,email} = req.body;
        const result = await Survey.findOneAndUpdate({_id},
            {$push: {Unlikes:email}},
            {new:true}); 
        res.status(200).json({
            msg:"Survey UnLiked"
        })
}
    catch(err){ 
        res.status(400).json({
            msg:"could not be UnLike Survey"
        })
     }
}   
exports.AddSuggetions = async(req,res) =>{
    try{
        const {_id,email,Suggetion} = req.body;
        const result = await Survey.findOneAndUpdate({_id},
            {$push: {Suggetions:Suggetion}},
            {new:true}); 
        res.status(200).json({
            msg:"Survey Suggested"
        })
}
    catch(err){
        res.status(400).json({
            msg:"could not be Suggested Survey"
        })
     }
}
exports.AddRating = async(req,res) =>{
    try{
        const {_id,email,Rating} = req.body;
        const result = await Survey.findOneAndUpdate({_id},
            {$push: {Ratings:Rating}},
            {new:true}); 
        res.status(200).json({
            msg:"Survey Rated has been updated"
        })
}
    catch(err){
        res.status(400).json({
            msg:"could not be rated Survey"
        })
     }
}

exports.GetSurvey = async(req,res) =>{
    try{
        const {Category} = req.body;
        const result = await Survey.find({Category});
          
        res.status(200).json({
            survey:result,
            msg:"Survey fetched "
        })
}
    catch(err){
        res.status(400).json({
            msg:"could not be rated Survey"
        })
     }
}
exports.GetProduct = async(req,res) =>{
    try{
        const {_id} = req.body;
        const result = await Survey.findOne({_id});
          
        res.status(200).json({
            product:result,
            msg:"Product fetched  "
        })
}
    catch(err){
        res.status(400).json({
            msg:"could not be rated Survey"
        })
     }
}