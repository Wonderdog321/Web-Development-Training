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
            console.log(error);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
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
   res.redirect("/campgrounds");
});
//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//=============================================
module.exports = router;