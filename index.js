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
var childSchema = require("./models/child/schema")
var Child = mongoose.model("Child",childSchema)

//parent routes
var signupParent = require("./models/parent/signup")

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
// passport.serializeUser(Docter.serializeUser())
// passport.deserializeUser(Docter.deserializeUser())
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

//parent routes
app.get("/signupParent",(req,res)=>{
    res.render("Parent/signup",{ page : "Signup"  })
})

app.get("/signinParent",(req,res)=>{
    res.render("Parent/signin",{ page : "Signin"  })
})

app.post("/signupParent",signupParent)

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


app.listen(3000,function(){
    console.log("SERVER AT 3000")
})