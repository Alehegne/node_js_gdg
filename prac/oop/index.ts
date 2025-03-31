
class Bank{

    private _balance:number = 0;
    private _accountNumber:string = "1234567890";
}

class Animals{
    protected _name:string = "Animal";
    protected _age:number = 0;

    constructor(name:string,age:number){
        this._name = name;
        this._age = age;
    }

    public getName():string{
        return this._name;
    }
    public getAge():number{
        return this._age;
    }
    
}

const animal = new Animals("Dog",5);
console.log(animal.getName()); // Dog