var mongoose = require("mongoose")

var childSchema = new mongoose.Schema({
    fname : String,
    lname : String,
    image : String,
    dob : String,
    age : String,
    gender : String,
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Parent"
    },
    docter : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Docter" 
    },
    vaccine : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vaccine"
    },
    nextDate : String,
    vaccineNumberWorkingOn : Number
})

module.exports = childSchema