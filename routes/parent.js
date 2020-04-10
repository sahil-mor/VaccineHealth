var express = require("express")
var router = express.Router();
var passport = require("passport")
var mongoose = require("mongoose")
var schema = require("../models/parent/schema")
var Parent = mongoose.model("Parent",schema)

var signupParent = require("../models/parent/signup")
var addChild = require("../models/parent/addChild")
var editProfileParent = require("../models/parent/editProfile")
var editParentPersonal = require("../models/parent/editProfilePersonal")
var editParentPic = require("../models/parent/editProfilePic")

router.get("/signupParent",(req,res)=>{
    res.render("Parent/signup",{ page : "Signup"  })
})

router.get("/signinParent",(req,res)=>{
    res.render("Parent/signin",{ page : "Signin"  })
})

router.post("/signupParent",signupParent)
router.post("/signinParent",passport.authenticate("parent",{
    failureRedirect : "/wrongCredentials-Parent",
    }),isParentLoggedIn, (req,res) => {
        req.flash("success","Welcome " + req.user.username)
        res.redirect("indexParent")
    }
)

router.get("/indexParent",isParentLoggedIn,(req,res)=>{
    Parent.findById(req.user._id).populate("children").exec( (err,foundParent) => {
        if(err){
            console.log(err)
            req.flash("UNEXPECTED ERROR OCCURED!!!")
            res.redirect("signinParent")
        }else{
            res.render("Parent/index",{ parent : foundParent})
        }
    } )
})

router.put("/addChild",isParentLoggedIn,addChild)
router.get("/editProfileParent",isParentLoggedIn,editProfileParent)
router.put("/editParentPersonal",isParentLoggedIn,editParentPersonal)
router.put("/editProfilePicParent",isParentLoggedIn,editParentPic)

function isParentLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error", "YOU MUST LOG IN FIRST!!!" )
        res.redirect("/signinParent")
    }
}

module.exports = router