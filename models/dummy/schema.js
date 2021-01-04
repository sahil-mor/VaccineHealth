var mongoose = require("mongoose")
mailedToSchema = new mongoose.Schema({
    email : {
        type : String,
        default : ""
    },
    name : {
        type : String,
        default : ""
    }
})
module.exports = mailedToSchema