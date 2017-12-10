var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
];
function seedDB(){
    //Remove all campgrounds!
    Campground.remove({}, function(error){
        if(error){
            console.log(error);
        }
        console.log("removed campgrounds!");
        //Add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(error, campground){
                if(error){
                    console.log(error);
                }else{
                    console.log("added a campground");
                    //Create a Comment
                    Comment.create({
                        text:"This place is greate, but I wish it had internet!",
                        author: "Homer"
                    }, function(error, comment){
                        if(error){
                            console.log(error);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
    //Add a few comments
}
module.exports = seedDB;
