const mongoose = require("mongoose")

const PollSchema = new mongoose.Schema({

question:String,

options:[String],

votes:[{
userId:String,
option:String
}],

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Poll",PollSchema)