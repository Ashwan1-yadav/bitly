const mongoose = require("mongoose")

const urlModel = new mongoose.Schema({
      shortUrl : {
        type : String,
        require : true,
        unique : true,
      },
      redirectUrl : {
        type : String,
        require : true,
        unique : true,
      },
      visitHistory : [{timestamp : {type : Number}}],
      createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "users"
      }

},{timestamps : true})

const URL = mongoose.model("url",urlModel)

module.exports = URL
