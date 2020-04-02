var express = require("express")
var router = express.Router();
var passport = require("passport")
var mongoose = require("mongoose")
var docterSchema = require("../models/docter/schema")
var Docter = mongoose.model("Docter",docterSchema)

var docterSignup = require("../models/docter/signup")
var docterProfile = require("../models/docter/profile")
var docterEditProfile = require("../models/docter/editProfile")
var docterEditProfilePic = require("../models/docter/editProfilePic")
var docterEditProfilePersonal = require("../models/docter/editPersonal")
var addEducationInfo = require("../models/docter/addEduInfo")
var delteEduInfo = require("../models/docter/deleteEduInfo")
var addExpInfo = require("../models/docter/addExpInfo")
var deleteExpInfo = require("../models/docter/deleteExpInfo")
var viewChild = require("../models/docter/viewChild")

router.get("/signupDocter", ( req,res ) => {
    res.render("Docter/signup", { page : "Signup"  } )
} )  

router.post("/signupDocter", docterSignup )

router.get("/signinDocter", ( req, res ) => {
    res.render("Docter/signin", { page : "Signin"  })
} )

router.post("/signinDocter", passport.authenticate("docter",{
    failureRedirect : "/wrongCredentials-Docter" ,
    }), isDocterLoggedIn, (req,res) => {
        req.flash("success","Welcome " + req.user.username )
        res.redirect("/indexDocter")
    }
)

router.get("/indexDocter",isDocterLoggedIn, (req, res) => {
    Docter.findById(req.user._id)
    .populate("patients")
    .exec((err,foundDocter) => {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/signinDocter")
        }else{
            res.render("Docter/index", { docter : foundDocter } )
        }
    } )
} )
router.get("/profileDocter",isDocterLoggedIn, docterProfile)

router.get("/editProfile",isDocterLoggedIn,docterEditProfile)
router.put("/editProfilePic",isDocterLoggedIn,docterEditProfilePic)
router.put("/editDocterPersonal",isDocterLoggedIn,docterEditProfilePersonal )

router.put("/addEducationInfo",isDocterLoggedIn,addEducationInfo)
router.put("/deleteEdu-:index",isDocterLoggedIn,delteEduInfo)
router.put("/addExpInfo",isDocterLoggedIn,addExpInfo)
router.put("/deleteExp-:index",isDocterLoggedIn,deleteExpInfo)
router.get("/viewChild-:childId",isDocterLoggedIn,viewChild)

function isDocterLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error", "YOU MUST LOG IN FIRST!!!" )
        res.redirect("/signinDocter")
    }
}

module.exports = router