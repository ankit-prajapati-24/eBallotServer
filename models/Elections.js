const mongoose = require('mongoose');

const ElectionsSchema = mongoose.Schema({
    Election_Title:{
        type: 'string',
    },
    Election_Details:{
        type: 'string',
    },
    Start_Date:{
        type: 'date',
    },
    End_Date:{
        type: 'date',
    },
    Category:{
        type: 'string',
    },
    Name:{
        type: 'string',
    },
    Candidates:[
        { type:mongoose.Schema.Types.ObjectId,
            ref:"Candidates"
        }
    ]
});

module.exports = mongoose.model('Elections',ElectionsSchema);