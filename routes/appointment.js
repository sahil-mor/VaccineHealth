var express = require("express")
var router = express.Router();

var scheduleVaccine = require("../models/appointments/scheduleVaccine")
var appointmentAttended = require("../models/appointments/attended")
var appointmentMissed = require("../models/appointments/missed")

router.put("/scheduleVaccine-:childId",isDocterLoggedIn,scheduleVaccine)
router.get("/appointmentAttended-:childId",isDocterLoggedIn,appointmentAttended)
router.get("/appointmentMissed-:childId",isDocterLoggedIn,appointmentMissed)

function isDocterLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error", "YOU MUST LOG IN FIRST!!!" )
        res.redirect("/signinDocter")
    }
}

module.exports = router