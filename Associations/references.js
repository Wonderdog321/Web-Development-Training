var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useMongoClient: true});
var Post = require("./models/post");
var User = require("./models/user");


//Populates the post array with all the content

/*User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(error, user){
    if(error){
        console.log(error);
    }else{
        console.log(user);
    }
});*/
Post.create({
    title:"How to cook the best burger pt4!",
    content: "Good bye burgers"
}, function(error, post){
    User.findOne({email: "bob@gmail.com"}, function(error, foundUser){
        if(error){
            console.log(error);
        }
        else{
            foundUser.posts.push(post);
            foundUser.save(function(error, data){
                if(error){
                    console.log(error);
                }else{
                    console.log(data);
                }
            });
        }
    });
});
/*User.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
});*/