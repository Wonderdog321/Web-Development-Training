var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient: true});
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
}); //Creates structure/model for db
var addNewCat = "no";
var Cat = mongoose.model("Cat", catSchema);
if(addNewCat === "yes"){
    //adding a new cat to the db
    var George = new Cat({
        name: "Mrs. Norris",
        age: 7,
        temperament: "Evil"
    });
    George.save(function(error, cat){
        //This checks to see if there was an error or if successfully added.
        if(error){
            console.log("Something went wrong");
        }else{
            console.log("We saved cat" + cat);
        }
    });
}
//Creates item and saves all at once
Cat.create({
    name: "Snow WHite",
    age: 15,
    temperament: "Bland"
}, function(error, cat){
    if(error){
        console.log("Error: " + error);
    }else{
        console.log(cat);
    }
});
//retrieve all cats from the DB and console.log each one
//Empty object "{}" used to find particular items
Cat.find({}, function(error, cats){
    if(error){
        console.log("Some kind of error " + error);
    }else{
        console.log("All of the cats!");
        console.log(cats);
    }
});