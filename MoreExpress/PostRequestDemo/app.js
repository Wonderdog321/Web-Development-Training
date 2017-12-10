var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/friends", function(req, res){
   res.render("friends", {friends: friends}); 
});

app.post("/addFriend", function(req, res){
    var newFriend =  req.body.newFriend;
   friends.push(newFriend);
   res.redirect("/friends");
});

//listen
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("CONNECTED!");
});