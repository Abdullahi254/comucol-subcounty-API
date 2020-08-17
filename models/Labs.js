const mongoose = require('mongoose')

const labSchema = new mongoose.Schema({
    ward:{
        type:String,
        required:true,
    },
    testsDone:{
        type:Number,
        required:true,
    },
    positive:{
        type:Number,
        required:true,
    },
    recovered:{
        type:Number,
        required:true,
    },
    deaths:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    },
})

const Labs = mongoose.model('Labs',labSchema)

module.exports = Labs