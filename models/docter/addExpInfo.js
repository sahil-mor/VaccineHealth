var mongoose = require("mongoose")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)

addExpInfo = (req,res) => {
    Docter.findById(req.user._id, (err, foundDocter) => {
        if(err){
            console.log(err)
            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
            res.redirect("indexDocter")
        }else{
            var newExpPackage = {
                year : req.body.yearOfQ,
                department : req.body.dept,
                position : req.body.position,
                hospital : req.body.hospital,
                feedback : req.body.feedback
            }
            foundDocter.experience.unshift(newExpPackage)
            foundDocter.save( (err,savedDocter) => {
                if(err){
                    console.log(err)
                    req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                    res.redirect("indexDocter")
                }else{
                    Docter.findByIdAndUpdate(req.user._id, savedDocter ,(err,updatedDocter) => {
                        if(err){
                            console.log(err)
                            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                            res.redirect("indexDocter")
                        }else{
                            req.flash("success","DATA ADDED SUCCESSFULLY!!!")
                            res.redirect("profileDocter")
                        }
                    } )
                }
            } )
        }
    } )
}

module.exports = addExpInfo