var mongoose = require("mongoose")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)

editProfile = (req,res) => {
    Docter.findById(req.user._id, (err,foundDocter) => {
        if(err){
            console.log(err)
            res.redirect("/signinDocter")
        }else{
            res.render("Docter/editProfile", { docter : foundDocter } )
        }
    } )
}

module.exports = editProfile