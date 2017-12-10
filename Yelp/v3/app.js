var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_camp_v3", {useMongoClient: true});
seedDB();
app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
        //Get all campgrounds from DB
        Campground.find({}, function(error, allCampgrounds){
            if(error){
                console.log(error);
            }else{
                res.render("index", {campgrounds: allCampgrounds});
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
   res.render("new.ejs"); 
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
            res.render("show", {campground: foundCampGround});
        }
    });
});
//listen
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Yelp Camp Serv v1.o!");
});