var fake = require("faker");
for(var i = 0; i < 10; i++){
    console.log("Product: " + fake.commerce.productName() + " | Price: " + fake.commerce.price());
}