var mongoose = require("mongoose")
var childSchema = require("../child/schema")
var Child = mongoose.model("Child",childSchema)
var vaccineSchema = require("../vaccine/schema")
var Vaccine = mongoose.model("Vaccine",vaccineSchema)


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
                                                        req.flash("success","Appointment Scheduled Successfully!!!")
                                                        res.redirect("viewChild-" + req.params.childId)
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