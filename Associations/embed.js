var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema);
//USER - email name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

/*ar newUser = new User({
    email: "robert@young.edu",
    name: "Robert Young"
});
newUser.posts.push({
    title: "How to bre polyjuice potion",
    content: "Just kidding go to potions class to learn it!"
});

newUser.save(function(error, user){
    if(error){
        console.log(error);
    }else{
        console.log(user);
    }
});*/

/*var newPost = new Post({
   title: "Reflections on Apples",
   content: "They are delicious!"
});

newPost.save(function(error, post){
    if(error){
        console.log(error);
    }else{
        console.log(post);
    }
});*/

User.findOne({name: "Robert Young"}, function(error, user){
    if(error){
        console.log(error);
    }else{
        user.posts.push({
           title:"3 things I really hate",
           content: "Voldemort, voldemort"
        });
        user.save(function(error, user){
           if(error){
               console.log(error);
           } else{
               console.log(user);
           }
        });
    }
});