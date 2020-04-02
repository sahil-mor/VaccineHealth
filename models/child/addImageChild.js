var mongoose = require("mongoose")
var childSchema = require("./schema")
var Child = mongoose.model("Child",childSchema)

var path = require("path")
var multer = require("multer")
var storage = multer.diskStorage({
    destination : "uploads/child/profilePics",
    filename : function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

var uploads = multer({
    storage : storage,
}).single('image')

addImage = (req,res) => {
    Child.findById(req.params.id,( err , foundChild ) => {
        if(err){
            console.log(err)
            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
            res.redirect("childInfo-" + req.params.id)
        }else{
            uploads(req,res, (err) => {
                if(err){
                    console.log(err)
                    req.flash("error","Unexpected Error Occured!!!")
                    res.redirect("childInfo-" + req.params.id)
                }else{
                    foundChild.image = req.file.path
                    foundChild.save( (err,savedChild) => {
                        if(err){
                            console.log(err)
                            req.flash("error","Unexpected Error Occured!!!")
                            res.redirect("childInfo-" + req.params.id)
                        }else{
                            Child.findByIdAndUpdate(req.params.id, savedChild ,( err, updatedChild ) => {
                                if(err){
                                    console.log(err)
                                    req.flash("error","Unexpected Error Occured!!!")
                                    res.redirect("childInfo-" + req.params.id)
                                }else{
                                    req.flash("success","Profile Picture Uploaded Successfully!!!")
                                    res.redirect("childInfo-" + req.params.id)
                                }
                            } )
                        }
                    } )
                }
            } )
        }
    })
}

module.exports = addImage