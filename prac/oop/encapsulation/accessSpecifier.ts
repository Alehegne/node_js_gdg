
class Access{

    public _balance:number = 0; //private
    protected _accountNum:string = ""; //protected
    public _date:Date = new Date();
    constructor(accountNum:string){
        this._accountNum = accountNum;
        this._date = new Date();
    }

    depositMoney(amount:number){
        this._balance+=amount;
    }
    
    withDraw(amount:number){
        if(this._balance > amount)
            this._balance-=amount
        else
          throw new Error("insufficient balance")
    }

}

class GetBalance extends Access{

    constructor(){
        super("1234567890")
    }

     getBalance(acc:string):number{
        console.log("type",typeof this._accountNum,typeof acc)
        if(this._accountNum === acc){
            return this._balance;
        }else{
            console.log("Account number is not valid")
            throw new Error("Account number is not valid")

        }
     }
}



class Employee{
    protected _salary:number = 5000; //protected
    protected _name:string; //protected
    protected _age:number; //protected
    public _firstName:string;//public
    public _date:Date = new Date();
    constructor(name:string, age:number,firstName:string = "no Name"){
        this._name = name;
        this._age = age;
        this._firstName = firstName;
        this._date = new Date();
    }
    public employeeDetails():Record<string,any>{
        return(
            {
                name:this._name,
                age:this._age,
                salary:this._salary,
                firstName:this._firstName,
                date:new Date(this._date).getFullYear()
            }
        )
    }

}

class Manager extends Employee{
    private _bonus:number = 1000;//private
    protected salary = this._salary + this._bonus;
    constructor(f:string,a:number){
        super(f,a)
    }

    managerDetails():Record<string,any>{
        return({
            name:this._name,
            age:this._age,
            salary:this.salary,
            bonus:this._bonus,
            firstName:this._firstName
        })
    }
}

const emp = new Employee("alex",34,"dfhfd");
console.log(emp.employeeDetails()) // { name: 'alex', age: 34, salary: 5000 }

const manager = new Manager("John",30);
console.log(manager.managerDetails()) // { name: 'John', age: 30, salary: 5000, bonus: 1000 }
