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
//Connects to database
mongoose.connect("mongodb://localhost/yelp_camp_v6", {useMongoClient: true});
//Stops annoying warning of deprication
mongoose.Promise = global.Promise;
//APP CONFIGS
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
seedDB();
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
//===================================================
//Landing Page
app.get("/", function(req,res){
   res.render("landing"); 
});
//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
        //Get all campgrounds from DB
        Campground.find({}, function(error, allCampgrounds){
            if(error){
                console.log(error);
            }else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        });
});

app.post("/campgrounds", function(req,res){
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to database
    Campground.create(newCampground, function(error, newlyCreated){
        if(error){
            console.log("There was an error: " + error);
        }else{
            //redirect to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new"); 
});
//Show - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find camopground based on ID
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampGround){
        if(error){
            console.log(error);
        }else{
            console.log(foundCampGround);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampGround});
        }
    });
});

// =====================
// COMMENTS ROUTES
//======================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(error, campground){
       if(error){
           console.log(error);
       }else{
           res.render("comments/new", {campground: campground});
       }
   });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(error, campground){
      if(error){
          console.log(error);
          res.redirect("/campgrounds");
      } else{
          Comment.create(req.body.comment, function(error, comment){
              if(error){
                  console.log(error);
              }else{
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
      }
   });
});
//=========================================================

//Auth Routes
//show register form
app.get("/register", function(req, res) {
   res.render("register"); 
});
//Register Logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error, user){
        if(error){
            console.log(error);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});
//Show Login Form
app.get("/login", function(req, res) {
    res.render("login");
});
//Handle login logic
app.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});
//Logout Route
app.get("/logout", function(req, res) {
   req.logout(); 
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//========================================================
//listen
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Yelp Camp Serv v6.o!");
});