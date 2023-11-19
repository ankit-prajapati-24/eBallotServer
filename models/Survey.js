const mongoose = require('mongoose');

const SurveySchema = mongoose.Schema({
    Image:{
        type:String
    },
    Video:{
        type:String
    },
    Name:{
        type:String
    },
    Details:{
        type:String
    },
    Ratings:[
        {
            type:String
        }
    ],
    Suggetions:[
        {
            type:String
        }
    ],
    Likes:[
        {
            type:String
        }
    ],
    Unlikes:[
        {
            type:String
        }
    ],
    Category:{
        type:String
    },
     Start_Date:{
        type: 'date',
    },
    End_Date:{
        type: 'date',
    },
})

module.exports = mongoose.model("Survey",SurveySchema);