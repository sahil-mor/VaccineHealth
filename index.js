var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var Nexmo = require("nexmo")
var passport = require("passport")
var LocalStratergy = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose")
var methodOverride = require("method-override")
var request = require("request")
var flash =  require("connect-flash")
var session = require('express-session');
nexmo = new Nexmo({
    apiKey : '8d8ab9de',
    apiSecret : 'zUtK2Ca2O0U0TvN0'
},{debug : true});

var app = express();

mongoose.connect("mongodb://localhost:27017/Vaccination" ,  { useUnifiedTopology: true,useNewUrlParser : true })

//models
var docterSchema = require("./models/docter/schema")
var Docter = mongoose.model("Docter",docterSchema)
var parentSchema = require("./models/parent/schema")
var Parent = mongoose.model("Parent",parentSchema)

//parent routes
var parentRoutes = require("./routes/parent")
//child routes
var childRoutes = require("./routes/child")
//appoinment routes
var appoinmentRoutes = require("./routes/appointment")
//docter routes
var docterRoutes = require("./routes/docter")

app.use(bodyParser.urlencoded({extended : true}))
app.set("view engine","ejs")
app.use('/uploads',express.static("uploads"))
app.use(express.static("public"))
app.use(methodOverride("_method"));

app.use(session({
    secret : "Vaccination",
    resave : false,
    saveUninitialized : false
}))

app.use(flash());
app.use(function(req,res,next){
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
})

app.use(passport.initialize())
app.use(passport.session())

passport.use("docter" ,new LocalStratergy(Docter.authenticate()))
passport.use("parent" ,new LocalStratergy(Parent.authenticate()))

passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    if(user!=null)
        done(null,user);
});

app.get("/",function(req,res){
    res.render("home")
})

app.use(docterRoutes)
app.use(parentRoutes)
app.use(childRoutes)
app.use(appoinmentRoutes)

app.get("/contact",( req, res ) => {
    res.render("contact")
})

app.get("/terms-of-service",(req,res) => {
    res.render("terms-of-service")
})

app.get("/wrongCredentials-:role", (req, res) => {
    req.flash("error","WRONG USERNAME OR PASSWORD")
    res.redirect("/signin" + req.params.role )
} )

app.get("/logout-:role",(req,res)=>{
    req.flash("success","YOU HAVE BEEN LOGGED OUT")
    req.logout()
    res.redirect("signin" + req.params.role)
})

app.listen(5000,function(){
    console.log("SERVER AT 5000")
})