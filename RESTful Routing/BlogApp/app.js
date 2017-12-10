var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    app        = express(),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
//App config
mongoose.connect("mongodb://localhost/blog_app", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
//Mongoose/model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//Restful routes
//INDEX PAGE
app.get("/", function(req, res) {
   res.redirect("/blogs"); 
});
//New route
app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});
//create route
app.post("/blogs", function(req, res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(error, newBlog){
        if(error){
            res.render("new");
        }else{
             //redirect to index
            res.redirect("/blogs");
        }
    });
});
//HOME PAGE
app.get("/blogs", function(req,res){
    Blog.find({}, function(error, blogs){
        if(error){
            console.log(error);
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});

//Show Blogs route
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(error, foundBlog){
      if(error){
          res.redirect("/blogs");
      }else{
          res.render("show", {blog: foundBlog});
      }
   });
});
//Edit Route
app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id, function(error, foundBlog){
       if(error){
           res.redirect("/blogs");
       } else{
           res.render("edit", {blog: foundBlog});
       }
    });
});
//Update Route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog){
       if(error){
           res.redirect("/blogs");
       } else{
           res.redirect("/blogs/" + req.params.id);
       }
    });
});
//Delete Route
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(error){
        if(error){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});
//listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server is running!"); 
});