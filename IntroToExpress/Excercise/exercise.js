var express = require("express");
var app = express();

app.get("/", function(request, response){
    response.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(request, response){
    var animals = request.params.animal;
    if(animals === 'pig'){
        response.send("The " + animals.toLowerCase() + " says Oink.");
    }else if(animals === 'cow'){
        response.send("The " + animals.toLowerCase() + " says Moo.");
    }else if(animals === 'dog'){
        response.send("The " + animals.toLowerCase() + " says Woof woof!");
    }
});

app.get("/repeat/:word/:number", function(request, response){
    var words = request.params.word;
    var num = request.params.number;
    var string = "";
    for(var count = 0; count < num; count++){
        string = string + words + " ";
    }
    response.send(string);
});

app.get("*", function(request, response){
    response.send("Sorry page not found, what are you doing with your life?");
});

//listening
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});