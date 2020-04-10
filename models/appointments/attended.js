var mongoose = require("mongoose")
var childSchema = require("../child/schema")
var Child = mongoose.model("Child",childSchema)
var vaccineSchema = require("../vaccine/schema")
var Vaccine = mongoose.model("Vaccine",vaccineSchema)
var parentSchema = require("../parent/schema")
var Parent = mongoose.model("Parent",parentSchema)

attended = (req,res) => {
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
                        if(foundVaccine.details[foundChild.vaccineNumberWorkingOn].schedule != "Reschedule Appointment" &&
                            foundVaccine.details[foundChild.vaccineNumberWorkingOn].schedule != "Not Scheduled Yet" 
                        ){ 
                            foundVaccine.details[foundChild.vaccineNumberWorkingOn].schedule = "Done On " + foundVaccine.details[foundChild.vaccineNumberWorkingOn].schedule
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
                                            foundChild.nextDate = "Not Scheduled Yet"
                                            foundChild.vaccineNumberWorkingOn += 1
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
                                                                        what : "You attended appointment for " + foundChild.fname , from : name,
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
                        }else{
                            req.flash("error","No Appoinment Scheduled!!!")
                            res.redirect("viewChild-" + req.params.childId)
                        }
                    }
                } )
            }
        }
    } )
}
module.exports = attended