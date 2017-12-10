var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp_v4", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
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
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
   res.render("campgrounds/new"); 
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
            res.render("campgrounds/show", {campground: foundCampGround});
        }
    });
});

// =====================
// COMMENTS ROUTES
//======================
app.get("/campgrounds/:id/comments/new", function(req, res) {
   Campground.findById(req.params.id, function(error, campground){
       if(error){
           console.log(error);
       }else{
           res.render("comments/new", {campground: campground});
       }
   });
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(error, campground){
      if(error){
          console.log(error);
          res.redirect("/campgrounds");
      } else{
          Comment.create(req.body.comment, function(error, comment){
              if(error){
                  console.log(error);
              }else{
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
      }
   });
   //create new comment
   //connect new comment to campground
});

//listen
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Yelp Camp Serv v1.o!");
});