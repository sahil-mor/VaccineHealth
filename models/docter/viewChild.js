var mongoose = require("mongoose")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)
var childSchema = require("../child/schema")
var Child = mongoose.model("Child",childSchema)

viewChild = (req,res) => {
    Docter.findById(req.user._id, (err,foundDocter) => {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("indexDocter")
        }else{
            Child.findById(req.params.childId)
            .populate("parent")
            .populate("vaccine")
            .exec( (err,foundChild) => {
                if(err){
                    console.log(err)
                    req.flash("error","Unexpected Error Occured!!!")
                    res.redirect("indexDocter") 
                }else{
                    if(foundChild.docter == req.user._id){
                    res.render("Docter/viewChild",{ child : foundChild, docter : foundDocter })
                    }else{
                        console.log(err)
                        req.flash("error","You Cannot Access This Page!!!")
                        res.redirect("indexDocter") 
                    }
                }
            } )
        }
    } )
}
module.exports = viewChild