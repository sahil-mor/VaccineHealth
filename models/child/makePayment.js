var mongoose = require("mongoose")
var childSchema = require("./schema")
var Child = mongoose.model("Child",childSchema)
var docterSchema = require("../docter/schema")
var Docter = mongoose.model("Docter",docterSchema)

makePayment = (req,res) => {
    Child.findById(req.params.childId)
    .populate("parent")
    .exec((err,foundChild) => {
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
                Docter.findById(req.params.docterId, (err,foundDocter) => {
                    if(err){
                        console.log(err)
                        req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                        res.redirect("childInfo-" + req.params.childId)
                    }else{
                        res.render("Parent/payment", { child : foundChild, parent : foundChild.parent, docter : foundDocter } )
                    }
                } )
            }
        }
    } )
}

module.exports = makePayment