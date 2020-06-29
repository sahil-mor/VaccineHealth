var express = require("express")
var router = express.Router();
var mongoose = require("mongoose")
var passport = require("passport") 

var otpSchema = require("../models/otp/otpSchema")
var OTP = mongoose.model("OTP", otpSchema)

var verifyOTPparent = require("../models/otp/verifyOtpParent") 
var verifyOTPdocter = require("../models/otp/verifyOtpDocter")

router.get("/otp-:email-:id", (req,res) => {
    res.render("Parent/otp",{ otpId : req.params.id, email : req.params.email , page : "Verify Email Address"  })
} )
router.get("/otpDocter-:email-:id", (req,res) => {
    res.render("Docter/otp",{ otpId : req.params.id, email : req.params.email , page : "Verify Email Address"  })
} )
router.post("/verifyEmailParent-:otpId",verifyOTPparent )
router.post("/verifyEmailDocter-:otpId",verifyOTPdocter)
module.exports = router