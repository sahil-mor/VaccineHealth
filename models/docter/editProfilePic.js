var mongoose = require("mongoose")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)

var path = require("path")
var multer = require("multer")
var storage = multer.diskStorage({
    destination : "uploads/profilePics",
    filename : function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

var uploads = multer({
    storage : storage,
}).single('image')

function editProfilePic(req,res){
    Docter.findById(req.user._id,function(err,foundDocter){
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("indexDocter")
        }else{
            uploads(req,res, (err) => {
                if(err){
                    console.log(err)
                    req.flash("error","Unexpected Error Occured!!!")
                    res.redirect("indexDocter")
                }else{
                    foundDocter.image = req.file.path
                    foundDocter.pictures.unshift(req.file.path)
                    foundDocter.save( (err,savedDocter) => {
                        if(err){
                            console.log(err)
                            req.flash("error","Unexpected Error Occured!!!")
                            res.redirect("indexDocter")
                        }else{
                            Docter.findByIdAndUpdate(req.user._id, savedDocter ,( err, updatedDocter ) => {
                                if(err){
                                    console.log(err)
                                    req.flash("error","Unexpected Error Occured!!!")
                                    res.redirect("indexDocter")
                                }else{
                                    req.flash("success","Profile Picture Uploaded Successfully!!!")
                                    res.redirect("indexDocter")
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