var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
//Creating new campground
var Campground = mongoose.model("Campground", campgroundSchema);
/*Campground.create({
   name: "Granite Hill",
   image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg",
   description: "This is a huge granite hill, no bathrooms, no water. Beautiful Granite!"
}, function(error, campground) {
    if(error){
        console.log(error);
    }else{
        console.log("new camp created");
        console.log(campground);
    }
});*/

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
        })
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
    Campground.findById(req.params.id, function(error, foundCampGround){
        if(error){
            console.log(error);
        }else{
            //render show template with that campground
            res.render("show", {campground: foundCampGround});
        }
    });
});
//listen
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Yelp Camp Serv v1.o!");
});