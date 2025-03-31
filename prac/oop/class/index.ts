
class BankAccount{
    private _balance:number = 0;
    readonly _accountNum:string = ""; //readOnly
    constructor(private accountNum:string){
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
    getBalance(){
        return this._balance
    }
}

const myAccount = new BankAccount("123");
myAccount.depositMoney(1000);
myAccount.withDraw(500)
const balance = myAccount.getBalance()
console.log(balance) // 500
