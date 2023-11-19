const express = require('express');
const router = express.Router();
const {uploadImageToCloudinary}= require("../utils/imageUploader");

const {UpdateProfile,DeleteAccount,ChangePassword,SendMail} = require('../controllers/Profile');
require("dotenv").config();


router.post('/UpdateProfile',UpdateProfile);
router.post('/ChangePassword',ChangePassword);
router.post('/SendMail',SendMail);

router.delete('/DeleteAccount',DeleteAccount);


  router.post("/test", async (req, res) => {
      console.log("call begin");
      
      try {
          console.log(req.body);
          const { name } = req.body;
  
          // Assuming you have uploaded the image using multer middleware
          const img = req.files.img; // Access the uploaded image here
  
          console.log("file fetch ", name, img);
  
          if (!img) {
              return res.status(400).send({ message: "No image provided" });
          }

          const thumbnailImage = await uploadImageToCloudinary(img, process.env.FOLDER_NAME);
  
          return res.status(200).send({
              url: thumbnailImage.secure_url,
              message: "Test successful",
          });
      } catch (err) {
          console.error(err);
          return res.status(500).send({ message: "Could not upload" });
      }
  });
 
  router.post("/getImageUrl",(req,res) =>{
    console.log(req.body);
    const {lname,fname} = req.body;
    res.status(200).json({
    imageurl : `https://api.dicebear.com/5.x/initials/svg?seed=${fname}${lname}`
    })
  })

module.exports = router;