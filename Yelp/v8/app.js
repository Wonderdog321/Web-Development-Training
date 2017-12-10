var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    passport      = require("passport"),
    mongoose      = require("mongoose"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");
//Route Files
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
//Connects to database
mongoose.connect("mongodb://localhost/yelp_camp_v6", {useMongoClient: true});
//Stops annoying warning of deprication
mongoose.Promise = global.Promise;
//APP CONFIGS
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
//seedDB(); //Seed The Database
//==========================================
//PASsPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Buddy wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Passes to all routes has to be under this stuff
app.use(function (req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

//========================================================
//listen
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Yelp Camp Serv v6.o!");
});