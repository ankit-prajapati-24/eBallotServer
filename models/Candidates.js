const mongoose =  require("mongoose");

const CandidateSchema = mongoose.Schema({
      Name:{
        type:String
      },
      Party:{
        type:String
      },
      age:{
        type:String
      },
      image:{
        type:String
      },
      ElectonsParticepate:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:"Elections"}
      ],
      votes:[
       { 
        Election_Title: String,
       }
      ]

});


module.exports = mongoose.model('Candidates',CandidateSchema);

