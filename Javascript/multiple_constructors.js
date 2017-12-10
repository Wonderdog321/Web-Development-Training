function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}
function Motorcycle(make, model, year){
    //Using car with similar code
    Car.apply(this, arguments);
    this.numWheels = 2;
}