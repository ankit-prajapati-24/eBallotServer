const { response } = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const mailSender = require("../utils/mailSender")

const {uploadImageToCloudinary} = require('../utils/imageUploader');
require("dotenv").config();
const  {contactUsEmail}  = require( '../mail/templates/contactFormRes');

exports.UpdateProfile = async(req,res)=>{
  try{
       //get data
       console.log(req.body);
       const {gender,contactNumber,Phone,Name,email} = req.body;
       const fullName = Name.split(' ');
       console.log(fullName);
       const image = req.files.image;
       const thumbnailImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
       const updateUser = await User.findOneAndUpdate({email:email} ,{
        firstName :fullName[0],
        lastName:fullName[1],
        phone:Phone, 
        Image:thumbnailImage.secure_url
       },{new:true});
       console.log(updateUser);
       // response return
       return res.status(200).json({
         UserDetails:updateUser
       });
  }
  catch(err){
       return res.status(500).json({
        success: false,
        message:"Couldn't save profile"
       });
  }
} 

exports.ChangePassword = async (req, res) => {
    try {
        // get data
        console.log(req.body)
        const { CurrentPassword, NewPassword, ConfirmPassword, email } = req.body;

        // Check if CurrentPassword matches the existing password
        const user = await User.findOne({ email });
        console.log(user)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = (user.password === CurrentPassword);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        // Update the password
        user.password = NewPassword;

        // Save the updated user
        const updatedUser = await user.save();

        // response return
        return res.status(200).json({
            UserDetails: updatedUser,
            message: "Password changed successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Couldn't change password",
        });
    }
};

  
  

exports.SendMail = async(req, res) =>{
    try{
        console.log(req.body);
        const {fullName,email,message} = req.body;
        const result = await mailSender(email,"Thank You for Your Feedback" ,contactUsEmail(fullName));
         console.log(result);
        return res.status(200).json({
            success: true,
            message:"FeedBack send successfully "
        })

    }
    catch(err){
        
        return res.status(500).json({
            success: false,
            message:" Erro in Account deleting"
        })
    }
}