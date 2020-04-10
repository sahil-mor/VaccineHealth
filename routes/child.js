var express = require("express")
var router = express.Router();
var mongoose = require("mongoose")

var schema = require("../models/child/schema")
var Child = mongoose.model("Child",schema)

var childInfoParent = require("../models/child/childInfo")
var addImageChild = require("../models/child/addImageChild")
var viewDocters = require("../models/child/viewDocters")
var viewDocter = require("../models/child/viewDocter")
var makePayment = require("../models/child/makePayment")
var appointDocter = require("../models/child/appointDocter")

router.get("/childInfo-:id",isParentLoggedIn,childInfoParent)
router.put("/addImage-:id",isParentLoggedIn,addImageChild)
router.get("/viewDoctersBy-:childId",isParentLoggedIn,viewDocters)
router.get("/viewDocter-:docterId-By-:childId",isParentLoggedIn,viewDocter)
router.get("/makePaymentTo-:docterId-For-:childId",isParentLoggedIn,makePayment)
router.post("/makePaymentTo-:docterId-For-:childId",isParentLoggedIn,appointDocter)

function isParentLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error", "YOU MUST LOG IN FIRST!!!" )
        res.redirect("/signinParent")
    }
}

module.exports = router