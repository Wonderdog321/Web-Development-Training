var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(request, response){
    response.send("Hi there!");
});
app.get("/bye", function(request, response){
    response.send("Good bye!");
});
app.get("/dog", function(request, response){
    response.send("Meow!");
});

app.get("/r/:subredditName", function(request, response) {
    var subreddit  = request.params.subredditName;
    response.send("Welcome to the " + subreddit.toUpperCase() + " subredit!");
});

app.get("*", function(request, response){
    response.send("Not an page.");
});


//Tell express to listen for request - start server

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});