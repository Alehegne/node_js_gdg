import PaymentProcessor from "./paymentProcessor";

class PaymentService{
    private processor:PaymentProcessor;
    constructor(processor:PaymentProcessor){
        this.processor = processor;
    }

    async executePayment(amount:number,currency:string):Promise<string>{
        const result = await this.processor.processPayment(amount,currency);
        return result;
    }
}

export default PaymentService;