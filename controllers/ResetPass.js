const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');

const crypto = require('crypto');
// reset password Token
exports.resetPasswordToken = async (req,res) =>{
   
    try{
        
   // get email form req body
    const {email} = req.body;
    
    // check user for this email , email validation 
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({msg:'user not found'});
    }
    // generate token 
    console.log("user is here" ,user);
    const token = crypto.randomUUID();
    
    console.log("user is here" ,user);
    // update user by adding toke and expireation time
    const updateddetails = await User.findOneAndUpdate({email},
      {  
          token: token,
          resetPasswordExpire: Date.now() + 3600000000000
        },
        {new:true}
    )
    // create url 
    const url = `https://localhost:3000/upadate-password/${token}`;
   
    // / send mail to user with token
    await mailSender(email,"password reset link",`${url}`);
    
    /// send res
     res.status(200).json({
        success:true,
        msg:'password reset link sent to your email'
     })
    }
    catch(err){
        console.log(" something went wrong while rese password ");
    }
}

// reset password

exports.resetPassword = async (req,res) =>{
    try{
       const {password,confirmPassword,token} = req.body
       //validaton 
       if(password!== confirmPassword){
           return res.status(400).json({msg:'passwords dont match'});
        }
        
        // get userdetails form db using token 
        const user = await User.findOne({token:token});
        
        console.log("user is her",user);
        if(!user){
            return res.status(400).json({msg:'user not found'});
        }
        
        // check timexpire or not
        if(user.resetpasswordexpires >Date.now()){
            return res.status(400).json({msg:'token has expired'});
        }
          console.log("checking timexpire");
        // hash pwd 
    //     const isMatch = await bcrypt.compare(oldpassword,user.password);
    //     if(!isMatch){
    //         return res.status(400).json({msg:'old password doesnt match'});
    //    }
       const hashedPassword = await bcrypt.hash(password,10);
     
       // password update 
       const updateddetails = await User.findOneAndUpdate({token:token},
        {  
          password:hashedPassword
        },
        {new:true}
       );

       console.log(updateddetails);
       
       // send response 
       return res.status(200).json({
        success:true,
        msg:'password updated successfully'
    })
    }
    catch(err){
        console.log(" something went wrong while rese password ");
    }
} 