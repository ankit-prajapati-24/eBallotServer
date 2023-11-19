const Elections = require('../models/Elections');
const Candidates = require("../models/Candidates"); 
const {uploadImageToCloudinary}= require("../utils/imageUploader");
const User = require('../models/User');
const mailSender = require("../utils/mailSender")
const {voteConfirmation} = require("../mail/templates/voteMail")
exports.createElection = async(req,res) => {
           try{

            const { Election_Topic,Election_Details,Start_Date,End_Date,Category,Name } = req.body;

            console.log("user want to create",req.body);

            const election = await Elections.create({
                Election_Title:Election_Topic,
                Election_Details:Election_Details,
                Start_Date:Start_Date,
                End_Date:End_Date,
                Category:Category,
                Name:Name
            });
            
              console.log("create then send response",election);
                
                res.status(200).json({
                    msg:"election succefully created"
                })

           }
           catch(err){
            res.status(404).json({
                msg:"election could not be created"
            })
           }
}

// const uploadImageToCloudinary = require('./uploadImageToCloudinary'); // Import your Cloudinary upload function

exports.addCandidate = async (req, res) => {
  try {
    console.log("User is ready to be a candidate", req.body, " ", req.files);
    const { Election_Name, Name, age, Party } = req.body;

    const img = req.files.image; // Access the uploaded image here

    console.log("file fetch ", Name, img);

    if (!img) {
      return res.status(400).send({ message: "No image provided" });
    }

    // Upload image to Cloudinary if needed
    const thumbnailImage = await uploadImageToCloudinary(img, process.env.FOLDER_NAME);
    console.log(thumbnailImage);
    // Create a candidate
    const candidate = await Candidates.create({
      Name: Name,
      age: age,
      Party: Party,
      image: thumbnailImage.secure_url,
    });

    console.log("Created candidate, then sent response", candidate);

    // Push the candidate's ObjectId to the candidates array in the Elections model
    const updatedData = await Elections.findOneAndUpdate(
      { Election_Title: Election_Name },
      { $push: { Candidates: candidate._id } },
      { new: true }
    ).populate('Candidates').exec();

    console.log("Created candidate, then sent response", updatedData);

    res.status(200).json({
      data: updatedData.Candidates,
    });
  } catch (err) {
    console.error("Error adding candidate:", err);
    res.status(500).json({
      msg: "Candidate could not be added",
    });
  }
};

exports.getElection = async(req,res)=>{
    try{
        const { Name } = req.body;
        const data = await Elections.find({Name:Name});
        console.log("this is Election_Title ",Name,data);
      res.status(200).json({
        data
      })
    }
    catch(err){
        res.status(500).json({
            msg:"could not fetch Election_Title"
        })
    }
}

exports.getCandidates = async(req,res)=>{
    try{
     
        console.log("this is Election_Title in getCandidates ",req.body);
      const {Election_Title} = req.body;
      const updatedData = await Elections.find({Election_Title:Election_Title}).populate('Candidates').exec();
          console.log(updatedData);
      res.status(200).json({
        data:updatedData
      });
    }
    catch(err){
        res.status(500).json({
            msg:"could not fetch elections"
        })
    }
}
// const User = require('../models/User'); // Import your User model

exports.addVote = async (req, res) => {
  try {
    const { email, Election_Title, Candidate_id } = req.body;
    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    // Check if the user has already voted for the given election and candidate
    const hasVoted = user.votes.some((vote) => vote.Election_Title === Election_Title && vote.Candidate === email);
    if (!hasVoted || hasVoted) {
      // Add the vote to the user's votes array
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $push: { votes: { Election_Title, Candidate: email } } },
        { new: true }
      ).populate('votes').exec();

      const updateCandidate = await Candidates.findOneAndUpdate(
        { _id :Candidate_id }, 
        
        { $push: { votes: { Election_Title } } },
        { new: true }
      ).populate('votes').exec();

      console.log(updateCandidate);
      const today = new Date();

// Extract the date components
const year = today.getFullYear();
const month = today.getMonth() + 1; // Note: Months are zero-indexed, so add 1
const day = today.getDate();

// Format the date as a string (e.g., "YYYY-MM-DD")
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


      const result = await mailSender(email,"vote Confirmation ",voteConfirmation(updateCandidate.Name,formattedDate,user.firstName));
        console.log(result); 
        res.status(200).json({
          msg: "Your Vote is SuccessFully Cast ",
        });
    } else {
      res.status(404).json({
        msg: "You have already voted for this election ",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
