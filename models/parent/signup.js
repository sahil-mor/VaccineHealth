var mongoose = require("mongoose")
var passport = require("passport")
var schema = require("./schema")
var Parent = mongoose.model("Parent",schema)

signup = (req, res) => {
    if(req.body.mobileNumber.length != 10){
        req.flash("error","Mobile Number Entered Is Wrong!!!")
        res.redirect("/signupParent")
    }else{
        Parent.findOne({ username : req.body.username }, (err, sameName ) => {
            if(err){
                console.log(err)
                req.flash("error","Unexpected Error Occurs!!!")
                res.redirect("/signupParent")
            }else{
                if(sameName){
                    req.flash("error","Username already taken!!!")
                    res.redirect("/signupParent")
                }else{
                    Parent.findOne({ mobileNumber : req.body.mobileNumber }, (err, sameNumber ) => {
                        if(err){
                            console.log(err)
                            req.flash("error","Unexpected Error Occurs!!!")
                            res.redirect("/signupParent")
                        }else{
                            if(sameNumber){
                                req.flash("error","Mobile Number already taken!!!")
                                res.redirect("/signupParent")
                            }else{
                                Parent.register({ username : req.body.username, mobileNumber : req.body.mobileNumber,
                                    image : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png",
                                    address : "",country : "",pinCode : "",city : "",state : "",fname : "",lname : "",
                                    joined : Date.now(),children : [],age : "",notifications : []
                                }, req.body.password, (err ,newUser ) => {
                                    if(err){
                                        console.log(err)
                                        req.flash("error","Unexpected Error Occurs!!!")
                                        res.redirect("/signupParent")
                                    }else{
                                        passport.authenticate("Parent")
                                        res.redirect("/indexParent")
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