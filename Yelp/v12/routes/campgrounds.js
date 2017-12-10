var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
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
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form and add to campground array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
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
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
//Edit CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    
    Campground.findById(req.params.id, function(error, foundCampGround){
        res.render("campgrounds/edit", {campground: foundCampGround});
    });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, updatedCampground){
        if(error){
            res.redirect("/campgrounds");
        }  else{
            res.redirect("/campgrounds/" + req.params.id);
        }
   });
   //redirect somewhere else
});
//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(error){
       if(error){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds");
       }
   });
});
//Middleware

//==============================

module.exports = router;
