const express = require('express');
const router = express.Router();
const {uploadImageToCloudinary}= require("../utils/imageUploader");
const {UpdateProfile,ChangePassword,SendMail} = require('../controllers/Profile');
require("dotenv").config();


router.post('/UpdateProfile',UpdateProfile);
router.post('/ChangePassword',ChangePassword);
router.post('/SendMail',SendMail);
module.exports = router;