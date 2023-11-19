const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        // required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true,
        // unique:true
    },
    uid:{
        type:Number,
        required:true,
    },
    accounttype:{
        type:String,
        enum:["Admin","Voter","Candidate"]
    },
   
    additiondetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    Image:{
        type:String,
        require:true
    },
    token:{
        type:String,
    },
    phone:{
        type:String
    },
    resetpasswordexpires:{
        type:Date,
        default:Date.now()
    },
    votes:[
     { 
      Election_Title:{
           type:String
      },
      Candidate:{
        type:String
      }
     }
    ]
})

module.exports = mongoose.model("User",UserSchema);