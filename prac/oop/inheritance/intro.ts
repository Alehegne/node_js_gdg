

class Animal{
    // Properties
    public name:string;
    public age:number;
    public color:string;
    public species:string;
    constructor(
         name:string,
         age:number,
         color:string,
         species:string
    ){
        this.name = name;
        this.age = age;
        this.color = color;
        this.species = species;
        }

    // Methods
    eat(food:string):void{
        console.log(`${this.name} is eating inherited ${food}`);
    }
    

}
class Dog extends Animal{
    // Properties
    public habitat:string;
    constructor(name,age,color,species,habitat:string){
        super(name,age,color,species)
        this.habitat = habitat;

        
    }

    bark():void{
        console.log(`${this.name} is barking`);
    }
    details():void{
        console.log(`Name: ${this.name}, Age: ${this.age}, Color: ${this.color}, Species: ${this.species}, Habitat: ${this.habitat}`);
    }
  
}

const dog = new Dog("max",5,"brown","dog","house");
dog.bark();
dog.details();
dog.eat("bone");