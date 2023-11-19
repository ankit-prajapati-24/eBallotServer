const mongoose = require('mongoose');
require("dotenv").config();
const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then( ()=> console.log('Connected to database'))
    .catch((err)=> console.log("error in database connection"));
}

module.exports = dbconnect;