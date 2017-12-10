var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
// =====================
// COMMENTS ROUTES
//======================
//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(error, campground){
       if(error){
           console.log(error);
       }else{
           res.render("comments/new", {campground: campground});
       }
   });
});
//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(error, campground){
      if(error){
          console.log(error);
          res.redirect("/campgrounds");
      } else{
          Comment.create(req.body.comment, function(error, comment){
              if(error){
                  req.flash("error", "Something went wrong..");
                  console.log(error);
              }else{
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  req.flash("success", "Sucessfully added comment!");
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
      }
   });
});
//Comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(error, foundComment) {
        if(error){
            res.redirect("back");
        }else{
             res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});
//Comments update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, updatedComment){
        if(error){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//Comments destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(error){
        if(error){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted.");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});
//Middleware

//=========================================================
module.exports = router;
