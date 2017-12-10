function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}
Vehicle.prototype.turnOn = function(){
  this.isRunning = true;  
};
Vehicle.prototype.turnOff = function(){
  this.isRunning = false;  
};
Vehicle.prototype.honk = function(){
  if(this.isRunning){
      console.log("Beep");
  }else{
      console.log("Car is turned off will not beep");
  }
};

var myCar = new Vehicle("Chevy", "Nova", 1973);
myCar.honk();
myCar.turnOn();
myCar.honk();
myCar.turnOff();
myCar.honk();