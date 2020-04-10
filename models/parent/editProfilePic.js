var mongoose = require("mongoose")
var schema = require("./schema")
var Parent = mongoose.model("Parent",schema)

var path = require("path")
var multer = require("multer")
var storage = multer.diskStorage({
    destination : "uploads/Parent/profilePics",
    filename : function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

var uploads = multer({
    storage : storage,
}).single('image')

function editProfilePic(req,res){
    Parent.findById(req.user._id,function(err,foundParent){
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("indexParent")
        }else{
            uploads(req,res, (err) => {
                if(err){
                    console.log(err)
                    req.flash("error","Unexpected Error Occured!!!")
                    res.redirect("indexParent")
                }else{
                    foundParent.image = req.file.path
                    foundParent.save( (err,savedParent) => {
                        if(err){
                            console.log(err)
                            req.flash("error","Unexpected Error Occured!!!")
                            res.redirect("indexParent")
                        }else{
                            Parent.findByIdAndUpdate(req.user._id, savedParent ,( err, updatedParent ) => {
                                if(err){
                                    console.log(err)
                                    req.flash("error","Unexpected Error Occured!!!")
                                    res.redirect("indexParent")
                                }else{
                                    req.flash("success","Profile Picture Uploaded Successfully!!!")
                                    res.redirect("indexParent")
                                }
                            } )
                        }
                    } )
                }
            } )
        }
    })
}
module.exports = editProfilePic