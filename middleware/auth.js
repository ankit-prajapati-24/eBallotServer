const jwt = require('jsonwebtoken');
require('dotenv').config();
const http = require('http'); // Or your preferred HTTP framework
const cookie = require('cookie');
const User = require('../models/User');
// auth
exports.auth = async (req, res, next) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');

        // Fetch the token from the cookies
        const token = cookies.cookie; // Replace 'token' with your cookie name
        console.log(" token is her ",token);
        
        if (!token) return res.status(401).json({ message: 'token is missing' });
       
        try{
            
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
         console.log(decoded);
         req.user = decoded;
         }
         catch(error){
             return res.status(401).json({ message: 'token is invalid' });
         }
       
        next();
    } catch (error) {
        res.status(401).json({ message: 'error in validting token' });
    }
};

// isStudent
exports.isStudent = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (req.user.accounttype ==='student') {
            res.status(200).json({ message: 'you are a student' });
        } else {
            res.status(401).json({ message: 'you are not a student' });
        }
    } catch (error) {
        res.status(401).json({ message: 'userrole can not be verified' });
    }
};
// isInstructor


exports.isInstructor = async (req, res,next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (req.user.accounttype ==='Instructor') {
            res.status(200).json({ message: 'you are a Instructor' });
        } else  if (req.user.accounttype ==='Student')  {
            res.status(401).json({ message: 'you are not a student' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'userrole can not be verified' });
    }
};
// isAdmin


exports.isAdmin = async (req, res,next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (req.user.accounttype ==='Admin') {
            res.status(200).json({ message: 'you are a student' });
        } else {
            res.status(401).json({ message: 'you are not a student' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'userrole can not be verified' });
    }
};