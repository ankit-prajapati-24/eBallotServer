const express = require('express');
const Router  = express.Router();

const {createElection,addCandidate,getElection,getCandidates,addVote} = require("../controllers/Election");

Router.post("/createElection",createElection);
Router.post("/addCandidate",addCandidate);
Router.post("/getElection",getElection);
Router.post("/getCandidates",getCandidates);
Router.post("/addVote",addVote);

module.exports = Router