var mongoose = require("mongoose")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)

editPersonal = (req, res) => {
    console.log("at right route")
    Docter.findById(req.user._id, ( err ,foundDocter ) => {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occurs!!!")
            res.redirect("indexDocter")
        }else{
            foundDocter.fname = req.body.fname;foundDocter.lname = req.body.lname;
            foundDocter.city = req.body.city;foundDocter.dob = req.body.dob;
            foundDocter.country = req.body.country;foundDocter.age = req.body.age;
            foundDocter.state = req.body.state;foundDocter.address = req.body.address;
            foundDocter.pinCode = req.body.pinCode,foundDocter.specialization = req.body.specialization,
            foundDocter.appointmentFee = req.body.appointmentFee
            foundDocter.save( (err,savedDocter) => {
                if(err){
                    console.log(err)
                    req.flash("error","Unexpected Error Occurs!!!")
                    res.redirect("indexDocter")
                }else{
                    console.log("heee")
                    Docter.findByIdAndUpdate(req.user._id, savedDocter, ( err , updatedDocter ) => {
                        if(err){
                            console.log(err)
                            req.flash("error","Unexpected Error Occurs!!!")
                            res.redirect("indexDocter")
                        }else{
                            req.flash("success","Data Updated Successfully!!!")
                            res.redirect("indexDocter")
                        }
                    } )
                }   
            } )
        }
    } )
}

module.exports = editPersonal