var express = require("express");
var app = express();
var bodyParser = require("body-parser");
    var campgrounds = [
            {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
            {name: "Granite Hill", image: "https://farm1.staticflickr.com/204/468394114_c9240ba2d2.jpg"},
            {name: "Mountain Ghost Rest", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
            {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
            {name: "Granite Hill", image: "https://farm1.staticflickr.com/204/468394114_c9240ba2d2.jpg"},
            {name: "Mountain Ghost Rest", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
            {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
            {name: "Granite Hill", image: "https://farm1.staticflickr.com/204/468394114_c9240ba2d2.jpg"},
            {name: "Mountain Ghost Rest", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"}];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
            res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

//listen
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Yelp Camp Serv v1.o!");
});