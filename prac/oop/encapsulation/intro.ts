
class Encapsulation{

    balance:number = 0;
}
//with out encapsulation

// const en = new Encapsulation();
// en.balance = -1000;//which is not possible in real world

// console.log(en.balance);

//with encapsulation

class Encapsulation2{

    private _balance:number = 0; //private with in the class

    deposit(amount:number):void{
        this._balance += amount;
    }

    withDraw(amount:number):void{
        if(this._balance > amount){
            this._balance -= amount;
        }else{
            throw new Error("insufficient balance")
        }
    }
    getBalance():number{
        return this._balance;
    }
}
const en2 = new Encapsulation2();
en2.deposit(1000);
en2.withDraw(500);
const balance = en2.getBalance();
console.log(balance); // 500

// console.log(en2.balance); // Error: Property 'balance' is private and only accessible within class 'Encapsulation2'.