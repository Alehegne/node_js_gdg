
abstract class  PaymentProcessor {
    
    abstract processPayment(amount:number,currency:string):Promise<string>
}

export default PaymentProcessor