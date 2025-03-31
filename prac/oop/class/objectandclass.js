const Car = {
  name: "Car",
  brand: "Toyota",
  model: "Corolla",
  year: 2020,

  getCarDetails() {
    return `${this.name} - ${this.brand} ${this.model}, Year: ${this.year}`;
  },
  changeCarName(name) {
    if (typeof name !== "string") {
      throw new Error("Invalid input: name must be a string.");
    }
    this.name = name;
  },
  setYear: function (year) {
    this.year = year;
  },
  //   setBrand:()=>{
  //     this.brand = "Honda";//this is not defined in arrow function, it returns undefined
  //   }
};

// console.log(Car.getCarDetails());
// Car.changeCarName("Honda");
// console.log(Car.getCarDetails());
// Car.setYear(2021);
// console.log(Car.getCarDetails());
// Car.setbrand();
// console.log(Car.getCarDetails());

//class solves the problem of creating multiple objects with similar properties and methods, it enables to
//create a blueprint for objects, and allows to create multiple objects with similar properties and methods

class CarClass {
  constructor(brand, model, year, color) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    //js:This
    //py:self
    //java:this
    //c#:this
    //c++:this
  }

  getCarDetails() {
    return {
      brand: this.brand,
      model: this.model,
      year: this.year,
      color: this.color,
    };
  }
  modifyYear(year) {
    this.year = year;
  }
}

// const car1 = new CarClass("Toyota", "Corolla", 2020, "Blue");
// console.log(car1.getCarDetails());
// car1.modifyYear(2021);
// console.log(car1.getCarDetails());

//properties and methods are defined in the class, and can be accessed using the object of the class

class Animal {
    //properties => attributes => fields => variables
    //methods => functions => behaviours => actions => operations
  name;
  species;
  age;
  constructor(name, species, age) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  getAnimalDetails() {
    return `${this.name} is a ${this.age} year old ${this.species}`;
  }
  modifyAge(age) {
    this.age = age;
  }
}

const animal1 = new Animal("Lion", "Mammal", 5);
const animal2 = new Animal("Eagle", "Bird", 3);
console.log(animal1.getAnimalDetails());
console.log(animal2.getAnimalDetails());
animal1.modifyAge(6);
console.log(animal1.getAnimalDetails());
