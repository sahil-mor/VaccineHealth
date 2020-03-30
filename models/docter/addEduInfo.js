var mongoose = require("mongoose")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)

addEduInfo = (req,res) => {
    Docter.findById(req.user._id, (err, foundDocter) => {
        if(err){
            console.log(err)
            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
            res.redirect("indexDocter")
        }else{
            var newEduPackage = {
                year : req.body.yearOfQ,
                degree : req.body.degree,
                institute : req.body.institute,
                result : req.body.result
            }
            foundDocter.education.unshift(newEduPackage)
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

module.exports = addEduInfo