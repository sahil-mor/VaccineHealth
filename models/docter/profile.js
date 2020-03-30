var mongoose = require("mongoose")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)

profile = (req,res) => {
    Docter.findById(req.user._id, (err,foundDocter) => {
        if(err){
            console.log(err)
            res.redirect("/signinDocter")
        }else{
            res.render("Docter/profile", { docter : foundDocter } )
        }
    } )
}

module.exports = profile