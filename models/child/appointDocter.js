var mongoose = require("mongoose")
var childSchema = require("./schema")
var Child = mongoose.model("Child",childSchema)
var docterSchema = require("../docter/schema")
var Docter = mongoose.model("Docter",docterSchema)

makePayment = (req,res) => {
    Child.findById(req.params.childId,  (err,foundChild) => {
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
                        foundChild.docter = foundDocter;
                        foundChild.save( (err,savedChild) => {
                            if(err){
                                console.log(err)
                                req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                                res.redirect("childInfo-" + req.params.childId)
                            }else{
                                Child.findByIdAndUpdate( req.params.childId, savedChild ,(err, updatedChild ) => {
                                    if(err){
                                        console.log(err)
                                        req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                                        res.redirect("childInfo-" + req.params.childId)
                                    }else{
                                        var list = foundDocter.patients
                                        if(list == undefined){
                                            list = []
                                        }
                                        list.push(foundChild)
                                        foundDocter.patients = list
                                        var newNotification = {
                                            what : foundChild.fname + "  " + foundChild.lname + " has appointed you." , 
                                            when : Date.now(),image : foundChild.image
                                        }
                                        if(foundDocter.notifications.length == 5 ){
                                            foundDocter.notifications = foundDocter.notifications.slice(0,3)
                                        }
                                        foundDocter.notifications.unshift(newNotification)
                                        foundDocter.save( (err,savedDocter) => {
                                            if(err){
                                                console.log(err)
                                                req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                                                res.redirect("childInfo-" + req.params.childId) 
                                            }else{
                                                Docter.findByIdAndUpdate(req.params.docterId,savedDocter,(err,updatedDocter)=>{
                                                    if(err){
                                                        console.log(err)
                                                        req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                                                        res.redirect("childInfo-" + req.params.childId)
                                                    }else{
                                                        req.flash("success",updatedDocter.username + " has been appointed to" + updatedChild.fname)
                                                        res.redirect("childInfo-" + req.params.childId)
                                                    }
                                                })
                                            }
                                        } )
                                    }
                                } )
                            }
                        } )
                    }
                } )
            }
        }
    } )
}

module.exports = makePayment