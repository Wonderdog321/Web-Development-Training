//All middleware goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(error, foundCampGround){
           if(error){
               req.flash("error", "Campground not found.");
               res.redirect("back");
           } else{
               //Does user own campground
               if(foundCampGround.author.id.equals(req.user._id)){
                     next();  
               }else{
                   req.flash("error", "You don't have permission to do that.");
                   res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    //Is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(error, foundComment){
           if(error){
               res.redirect("back");
           } else{
               //Does user own comment
               if(foundComment.author.id.equals(req.user._id)){
                     next();  
               }else{
                   req.flash("error", "You don't have permission to do that.");
                   res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //Else - the return skips this part if true
    //Have to use flash before you redirect, it does it next page.
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};


module.exports = middlewareObj;