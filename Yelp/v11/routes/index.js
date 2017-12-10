var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
//Landing Page
router.get("/", function(req,res){
   res.render("landing"); 
});

//Auth Routes
//show register form
router.get("/register", function(req, res) {
   res.render("register"); 
});
//Register Logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error, user){
        if(error){
            //Passport sends errors
            return res.render("register", {"error": error.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp Camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});
//Show Login Form
router.get("/login", function(req, res) {
    res.render("login");
});
//Handle login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});
//Logout Route
router.get("/logout", function(req, res) {
   req.logout(); 
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});
//Middleware
//=============================================
module.exports = router;