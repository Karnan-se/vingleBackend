import { configKeys } from "../../../config.ts"
import Stripe from "stripe"

import { IPaymentService } from "../../../entitties/interfaces/service.ts/IPaymentService.ts"


const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY as string)


export class PaymentService implements IPaymentService {
    constructor(){}

    async stripePayment(amount:number, currency="INR", metadata={} ){
        const paymentIntent = await stripe.paymentIntents.create({amount, currency, metadata })
      
    }

    async checkoutPage( price:number , courseName:string, courseImage:string){
        try {

            const session = await stripe.checkout.sessions.create({
                success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url: 'http://localhost:5173/cancel',
                payment_method_types: ['card'],
                line_items: [
                  {
                    price_data: {
                      currency: 'usd',
                      product_data: { name: courseName , images:[courseImage] },
                      unit_amount: price,
                    
                    },
                    quantity: 1,
                  },
                ],
                mode: 'payment',
              });
              
            return session
            
        } catch (error) {
            console.error('Error creating Checkout Session:', error);
            throw error
            
        }
        
        
        
    }
    

}