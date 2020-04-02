var mongoose = require("mongoose")
var childSchema = require("../child/schema")
var Child = mongoose.model("Child",childSchema)
var vaccineSchema = require("../vaccine/schema")
var Vaccine = mongoose.model("Vaccine",vaccineSchema)

missed = (req,res) => {
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
                            foundVaccine.details[foundChild.vaccineNumberWorkingOn].schedule = "Reschedule Appointment"
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
                                            foundChild.nextDate = "Required To Be Rescheduled!!!"
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
                                                            req.flash("success","Data Updated Successfully!!!")
                                                            res.redirect("viewChild-" + req.params.childId)
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
module.exports = missed