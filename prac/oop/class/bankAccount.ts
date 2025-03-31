
class BankAccount{
    private _balance:number = 0;
    private _accountNum:string = "";
    constructor( accountNum:string){
        this._accountNum = accountNum;
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
    getBalance():number{
        return this._balance
    }
}

const myAccount = new BankAccount("123");
console.log(myAccount._accountNum); // Error: Property '_accountNum' is private and only accessible within class 'BankAccount'.
