import PaymentProcessor from "./paymentProcessor";
import PaymentService from "./paymentService";
import PaypalPaymentProcessor from "./PaypalPayment";
import StripePaymentProcessor from "./stripe";


async function main() {
    console.log("execuing...")
 //with Stripe
    let paymentProcessor:PaymentProcessor;
    paymentProcessor = new StripePaymentProcessor();
    const paymentService = new PaymentService(paymentProcessor);

    const result = await paymentService.executePayment(100, "USD");
    console.log(result);

    //with paypal
    paymentProcessor = new PaypalPaymentProcessor();
    const paymentPaypal = new PaymentService(paymentProcessor);
    const resultPaypal = await paymentPaypal.executePayment(200, "USD");
    console.log(resultPaypal);



    
}