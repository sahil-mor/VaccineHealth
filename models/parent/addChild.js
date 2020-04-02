var mongoose = require("mongoose")
var parentSchema = require("./schema")
var Parent = mongoose.model("Parent",parentSchema)
var childSchema = require("../child/schema")
var Child = mongoose.model("Child",childSchema)
var vaccineSchema = require("../vaccine/schema")
var Vaccine = mongoose.model("Vaccine",vaccineSchema)

addChild = (req,res) => {
    Parent.findById(req.user._id,(err,foundParent)=>{
        if(err){
            console.log(err)
            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
            res.redirect("indexParent")
        }else{
            Vaccine.create({
                details : [
                { vaccineName : "BCG",whenToGive : "At birth or as early as possible till one year of age", dose : "0.1ml (0.05ml until 1 month age)",route : "Intra-muscular" ,site : "Left Upper Arm ",schedule : "Not Scheduled Yet"},
                { vaccineName : "Hepatitis B - Birth dose", whenToGive : "At birth or as early as possible within 24 hours ", dose : "0.5ml",route : "Intra-muscular" ,site : "Intra-muscular ",schedule : "Not Scheduled Yet"  },
                { vaccineName : "OPV-0 ", whenToGive : "At birth or as early as possible within the first 15 days", dose : "2 drops",route : "Oral" ,site : "Oral",schedule : "Not Scheduled Yet"  },
                { vaccineName : "OPV 1, 2 & 3 ", whenToGive : "At 6 weeks, 10 weeks & 14 weeks (OPV can be given till 5 years of age)", dose : "2 drops",route : "Oral" ,site : "Oral",schedule : "Not Scheduled Yet"  },
                { vaccineName : "Pentavalent 1, 2 & 3", whenToGive : "At 6 weeks, 10 weeks & 14 weeks (can be given till one year of age)", dose : "0.5 ml",route : "Intra-muscular" ,site : "Antero-lateral side of mid-thigh",schedule : "Not Scheduled Yet"  },
                { vaccineName : "Rotavirus#", whenToGive : "At 6 weeks, 10 weeks & 14 weeks (can be given till one year of age)", dose : "5 drops",route : "Oral" ,site : "Oral",schedule : "Not Scheduled Yet"  },
                { vaccineName : "IPV ", whenToGive : "Two fractional dose at 6 and 14 weeks of age", dose : "0.1 ml ",route : "Intra dermal two fractional dose" ,site : "Intra-dermal: Right upper arm",schedule : "Not Scheduled Yet"  },
                { vaccineName : "Measles /MR 1st Dose$", whenToGive : "9 completed months-12 months (can be given till 5 years of age)", dose : "0.5 ml ",route : "Sub-cutaneous " ,site : "Right upper Arm",schedule : "Not Scheduled Yet"  },    
                { vaccineName : "JE - 1** ", whenToGive : "9 completed months-12 months", dose : "0.5 ml ",route : "Sub-cutaneous " ,site : "Left upper Arm",schedule : "Not Scheduled Yet"  },
                { vaccineName : "Vitamin A(1st dose)", whenToGive : "At 9 completed months with measlesRubella", dose : "1 ml( 1 lakh IU)",route : "Oral" ,site : "Oral ",schedule : "Not Scheduled Yet"  },    
            ]} , (err,createdVaccine) => {
                if(err){
                    console.log(err)
                    req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                    res.redirect("indexParent")
                }else{
                    Child.create({
                        fname : req.body.fname,
                        lname : req.body.lname,
                        image : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png",
                        dob : req.body.dob,
                        age : req.body.age,
                        gender : req.body.gender,
                        parent : foundParent,
                        vaccine : createdVaccine,
                        nextDate : "NOT SCHEDULED YET",
                        vaccineNumberWorkingOn : 0
                    }, (err,newChild) => {
                        if(err){
                            console.log(err)
                            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                            res.redirect("indexParent")
                        }else{
                            var current = foundParent.children
                            if(current.length == 0 || current == undefined){
                                current = []
                            }
                            current.unshift(newChild)
                            foundParent.children = current
                            foundParent.save( (err,savedParent) => {
                                if(err){
                                    console.log(err)
                                    req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                                    res.redirect("indexParent")
                                }else{
                                    Parent.findByIdAndUpdate(req.user._id, savedParent ,(err,updatedParent) => {
                                        if(err){
                                            console.log(err)
                                            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                                            res.redirect("indexParent")
                                        }else{
                                            req.flash("success","Child Added Successfully!!!")
                                            res.redirect("indexParent")
                                        }
                                    } )
                                }
                            } )
                        }
                    } )
                }
            })
        }
    })
}

module.exports = addChild