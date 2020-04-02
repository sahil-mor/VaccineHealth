var mongoose = require("mongoose")
var vaccineSchema = new mongoose.Schema({
    details : Array
})
module.exports = vaccineSchema