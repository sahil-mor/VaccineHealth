var mongoose = require("mongoose")
var childSchema = require("./schema")
var Child = mongoose.model("Child",childSchema)
var docterSchema = require("../docter/schema")
var Docter = mongoose.model("Docter",docterSchema)

viewDocters = (req,res) => {
    Child.findById(req.params.childId )
    .populate("parent")
    .populate("vaccine")
    .populate("docter")
    .exec( (err,foundChild) => {
        if(err){
            console.log(err)
            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
            res.redirect("childInfo-" + req.params.childId)
        }else{
            if(foundChild.parent._id == req.params._id ){
                console.log(err)
                req.flash("error","You cannot access this page!!!")
                res.redirect("signinParent")
            }else{            
                Docter.find( {}, (err,allDocters) => {
                    if(err){
                        console.log(err)
                        req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                        res.redirect("childInfo-" + req.params.childId)
                    }else{
                        res.render("Parent/doctersList",{ child : foundChild, parent : foundChild.parent , allDocters : allDocters })
                    }
                } )
            }
        }
    } )
}

module.exports = viewDocters