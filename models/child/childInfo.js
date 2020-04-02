var mongoose = require("mongoose")
var schema = require("./schema")
var Child = mongoose.model("Child",schema)

childInfo = (req,res) => {
    Child.findById(req.params.id)
    .populate("parent")
    .populate("vaccine")
    .populate("docter")
    .exec( (err,foundChild) => {
        if(err){
            console.log(err)
            req.flash("error","UNEXPECTED ERROR OCCURED")
            res.redirect("indexParent")
        }else{
            if(foundChild.parent._id == req.user._id){
                res.render("Parent/childInfoParent",{ child : foundChild, parent : foundChild.parent })
            }else{
                req.flash("error","YOU DON'T HAVE ACCESS TO THIS PAGE")
                res.redirect("signinParent")
            }
        }
    })
}

module.exports = childInfo