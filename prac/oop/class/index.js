var BankAccount = /** @class */ (function () {
    function BankAccount(accountNum) {
        this.accountNum = accountNum;
        this._balance = 0;
    }
    BankAccount.prototype.depositMoney = function (amount) {
        this._balance += amount;
    };
    BankAccount.prototype.withDraw = function (amount) {
        if (this._balance > amount)
            this._balance -= amount;
        else
            throw new Error("insufficient balance");
    };
    BankAccount.prototype.getBalance = function () {
        return this._balance;
    };
    return BankAccount;
}());
var myAccount = new BankAccount("123");
myAccount.depositMoney(1000);
myAccount.withDraw(500);
var balance = myAccount.getBalance();
console.log(balance); // 500
