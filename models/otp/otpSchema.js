var mongoose = require("mongoose")

var otpSchema = new mongoose.Schema({
    timeOfSending : Date,
    otp : Number,
    email : String,
    username : String,
    password : String
})

module.exports = otpSchema