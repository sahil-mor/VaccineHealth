var mongoose = require("mongoose")
var schema = require("./schema")
var Parent = mongoose.model("Parent",schema)

editProfile = (req,res) => {
    Parent.findById(req.user._id, (err,foundParent) => {
        if(err){
            console.log(err)
            res.redirect("/signinParent")
        }else{
            res.render("Parent/editProfile", { parent : foundParent } )
        }
    } )
}

module.exports = editProfile