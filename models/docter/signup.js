var mongoose = require("mongoose")
var passport = require("passport")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)

signup = (req, res) => {
    if(req.body.mobileNumber.length != 10){
        req.flash("error","Mobile Number Entered Is Wrong!!!")
        res.redirect("/signupDocter")
    }else{
        Docter.findOne({ username : req.body.username }, (err, sameName ) => {
            if(err){
                console.log(err)
                req.flash("error","Unexpected Error Occurs!!!")
                res.redirect("/signupDocter")
            }else{
                if(sameName){
                    req.flash("error","Username already taken!!!")
                    res.redirect("/signupDocter")
                }else{
                    Docter.findOne({ mobileNumber : req.body.mobileNumber }, (err, sameNumber ) => {
                        if(err){
                            console.log(err)
                            req.flash("error","Unexpected Error Occurs!!!")
                            res.redirect("/signupDocter")
                        }else{
                            if(sameNumber){
                                req.flash("error","Mobile Number already taken!!!")
                                res.redirect("/signupDocter")
                            }else{
                                Docter.register({ username : req.body.username, mobileNumber : req.body.mobileNumber,
                                    patients : [], image : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png",
                                    specialization : "",address : "",country : "",pinCode : "",
                                    alternateContact : "",joined : Date.now(),FacebookUrl: "",TwitterUrl: "",
                                    InstagramUrl: "", LinkedinUrl: "",completedVaccinations : [],appointmentFee : "INR 0",
                                    age : "", pictures : [], education : [], experience : [],notifications : []
                                }, req.body.password, (err ,newUser ) => {
                                    if(err){
                                        console.log(err)
                                        req.flash("error","Unexpected Error Occurs!!!")
                                        res.redirect("/signupDocter")
                                    }else{
                                        passport.authenticate("docter")
                                        res.redirect("/indexDocter")
                                    }
                                } )
                            }
                        }
                    } )
                }
            }
        } )
    }
}

module.exports = signup