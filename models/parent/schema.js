var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var parentSchema = new mongoose.Schema({
    username : String,
    password : String,
    mobileNumber : String,
    image : String,
    children : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Child"
        }
    ],
    address : String,
    city : String,
    state : String,
    country : String,
    pinCode : String,
    joined : Date,
    age : String,
    notifications : [{
        what : String,
        from : String,
        when : String,
        image : String
    }],
    fname : String,
    lname : String
})

parentSchema.plugin(passportLocalMongoose)

module.exports = parentSchema