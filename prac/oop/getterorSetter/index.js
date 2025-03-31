class Car {
  constructor(brand, model, year, color) {
    this.carBrand = brand;
    this.carModel = model;
    this.carYear = year;
    this.carColor = color;
  }

  set carInfo(info) {
    if (typeof info !== "object" || info === null) {
      throw new Error("Invalid input: info must be an object.");
    }
    const { brand, model, year, color } = info;
    this.carBrand = brand;
    this.carModel = model;
    this.carYear = year;
    this.carColor = color;
  }

  get carInfo() {
    return {
      brand: this.carBrand,
      model: this.carModel,
      year: this.carYear,
      color: this.carColor,
    };
  }
}

// Use case: Standardize how data is sent/received
// scenario:Prevent direct modification of private properties
// 📌 Example: A banking system where balance updates must be controlled

class Person {
  #age = 0; // Private property in JavaScript
  constructor(age) {
    this.#age = age;
  }
}

class Animal {
  constructor(name, species, age) {
    this.name = name;
    this.species = species;
    this.age = age;
  }
}
