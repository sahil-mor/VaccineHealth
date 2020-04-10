var mongoose = require("mongoose")
var childSchema = require("../child/schema")
var Child = mongoose.model("Child",childSchema)
var vaccineSchema = require("../vaccine/schema")
var Vaccine = mongoose.model("Vaccine",vaccineSchema)
var parentSchema = require("../parent/schema")
var Parent = mongoose.model("Parent",parentSchema)
var docterSchema = require("../docter/schema")
var Docter = mongoose.model("Docter",docterSchema)

scheduleVaccine = (req,res) => {
    Child.findById(req.params.childId , (err,foundChild) => {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("indexDocter") 
        }else{
            if(foundChild.docter != req.user._id){
                console.log(err)
                req.flash("error","You Cannot Access This Page!!!")
                res.redirect("indexDocter") 
            }else{
                Vaccine.findById(foundChild.vaccine, (err,foundVaccine) => {
                    if(err){
                        console.log(err)
                        req.flash("error","Unexpected Error Occured!!!")
                        res.redirect("indexDocter") 
                    }else{
                        foundVaccine.details[foundChild.vaccineNumberWorkingOn].schedule = req.body.date
                        foundVaccine.save( (err,savedVaccine) => {
                            if(err){
                                console.log(err)
                                req.flash("error","Unexpected Error Occured!!!")
                                res.redirect("indexDocter") 
                            }else{
                                Vaccine.findByIdAndUpdate( foundChild.vaccine, savedVaccine, (err,updatedVaccine) => {
                                    if(err){
                                        console.log(err)
                                        req.flash("error","Unexpected Error Occured!!!")
                                        res.redirect("indexDocter") 
                                    }else{
                                        foundChild.nextDate = req.body.date
                                        foundChild.save( (err,savedChild) => {
                                            if(err){
                                                console.log(err)
                                                req.flash("error","Unexpected Error Occured!!!")
                                                res.redirect("indexDocter") 
                                            }else{
                                                Child.findByIdAndUpdate(req.params.childId,savedChild,(err,updatedChild)=>{
                                                    if(err){
                                                        console.log(err)
                                                        req.flash("error","Unexpected Error Occured!!!")
                                                        res.redirect("indexDocter") 
                                                    }else{
                                                        Parent.findById(foundChild.parent, (err,foundParent) => {
                                                            if(err){
                                                                console.log(err)
                                                                req.flash("error","Unexpected Error Occured!!!")
                                                                res.redirect("indexDocter") 
                                                            }else{
                                                                var name = "";
                                                                if( req.user.fname != "" ){
                                                                    name = req.user.fname + " " + req.user.lname 
                                                                }else{
                                                                    name = req.user.username
                                                                }
                                                                var newNotification = {
                                                                    what : "Next appointment for " + foundChild.fname + " is " + req.body.date , from : name,
                                                                    when : Date.now(),image : foundChild.image
                                                                }
                                                                if(foundParent.notifications.length == 5 ){
                                                                    foundParent.notifications = foundParent.notifications.slice(0,3)
                                                                }
                                                                foundParent.notifications.unshift(newNotification)
                                                                foundParent.save( (err,savedParent) => {
                                                                    if(err){
                                                                        console.log(err)
                                                                        req.flash("error","Unexpected Error Occured!!!")
                                                                        res.redirect("indexDocter") 
                                                                    }else{
                                                                        Parent.findByIdAndUpdate(foundChild.parent,savedParent,(err,updatedParent)=>{
                                                                            if(err){
                                                                                console.log(err)
                                                                                req.flash("error","Unexpected Error Occured!!!")
                                                                                res.redirect("indexDocter") 
                                                                            }else{
                                                                                req.flash("success","Data Updated Successfully!!!")
                                                                                res.redirect("viewChild-" + req.params.childId)
                                                                            }
                                                                        })
                                                                    }
                                                                } )
                                                            }
                                                        } )
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
module.exports = scheduleVaccine