import PaymentProcessor from "./paymentProcessor";

class StripePaymentProcessor extends PaymentProcessor{

    processPayment(amount: number, currency: string): Promise<string> {
        //logic
        console.log(`processing payment of ${amount}, with current ${currency}`);

        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                console.log("payment processed successfully");
                resolve("success");
            }, 3000);   
        })
    }
}

export default StripePaymentProcessor;