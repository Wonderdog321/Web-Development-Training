var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//INDEX - show all campgrounds
router.get("/", function(req, res){
        //Get all campgrounds from DB
        Campground.find({}, function(error, allCampgrounds){
            if(error){
                console.log(error);
            }else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        });
});
//Create Route
router.post("/", isLoggedIn, function(req,res){
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
//New - show form to create new campground
router.get("/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});
//Show - shows more info about one campground
router.get("/:id", function(req, res){
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

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//=

module.exports = router;
