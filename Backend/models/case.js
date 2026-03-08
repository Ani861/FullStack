const mongoose = require("mongoose")

const CaseSchema = new mongoose.Schema({

trackingId:String,

category:String,

department:String,

location:String,

severity:String,

description:String,

anonymous:Boolean,

status:{
  type:String,
  default:"New"
},

assignedManager:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},

notes:String,

createdAt:{
  type:Date,
  default:Date.now
}

})

module.exports = mongoose.model("Case",CaseSchema)