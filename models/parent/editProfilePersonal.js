var mongoose = require("mongoose")
var schema = require("./schema")
var Parent = mongoose.model("Parent",schema)

editPersonal = (req, res) => {
    console.log("at right route")
    Parent.findById(req.user._id, ( err ,foundParent ) => {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occurs!!!")
            res.redirect("indexParent")
        }else{
            foundParent.fname = req.body.fname;foundParent.lname = req.body.lname;
            foundParent.city = req.body.city; foundParent.country = req.body.country;
            foundParent.age = req.body.age;foundParent.pinCode = req.body.pinCode;
            foundParent.state = req.body.state;foundParent.address = req.body.address;
            foundParent.save( (err,savedParent) => {
                if(err){
                    console.log(err)
                    req.flash("error","Unexpected Error Occurs!!!")
                    res.redirect("indexParent")
                }else{
                    console.log("heee")
                    Parent.findByIdAndUpdate(req.user._id, savedParent, ( err , updatedParent ) => {
                        if(err){
                            console.log(err)
                            req.flash("error","Unexpected Error Occurs!!!")
                            res.redirect("indexParent")
                        }else{
                            req.flash("success","Data Updated Successfully!!!")
                            res.redirect("indexParent")
                        }
                    } )
                }   
            } )
        }
    } )
}

module.exports = editPersonal