import { configKeys } from "../../../config"
import Stripe from "stripe"
import AppError from "./appError"
import { Iuser } from "../../../entitties/interfaces/user/user"
import { IPaymentService } from "../../../entitties/interfaces/service.ts/IPaymentService"




const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY as string)


export class PaymentService implements IPaymentService {
    constructor(){}

    async stripePayment(amount:number, currency="INR", metadata={} ){
        const paymentIntent = await stripe.paymentIntents.create({amount, currency, metadata })
      
    }

    async checkoutPage( price:number , courseName:string, courseImage:string){
        try {

            const session = await stripe.checkout.sessions.create({
                success_url: `${configKeys.MY_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${configKeys.MY_DOMAIN}/cancel`,
                payment_method_types: ['card'],
                line_items: [
                  {
                    price_data: {
                      currency: 'INR',
                      product_data: { name: courseName , images:[courseImage] },
                      unit_amount: price,
                    
                    },
                    quantity: 1,
                  },
                ],
                invoice_creation:{enabled:false},
                
                mode: 'payment',
              });
              
            return session
            
        } catch (error) {
            console.error('Error creating Checkout Session:', error);
            throw error
            
        }
   
    }
   async ispaymentverified(sessionId:string):Promise<Stripe.Checkout.Session> {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    try {
      if(!session){
        throw AppError.conflict("payment is not verifies")
        
      }
      if(session.payment_status == "paid"){
        console.log(session.customer ,  "session customer ")
        
        return session as unknown as Stripe.Checkout.Session
      }
      console.log("payeement not compleated")
      throw  AppError.conflict("Payment not completed");
 
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getInvoice(session:Stripe.Checkout.Session , userInfo:Iuser):Promise<any>{


    let invoiceDetail = session.invoice

  if(!invoiceDetail){
    console.log("no Invoice")
  }

    const invoice = await stripe.invoices.retrieve(invoiceDetail as string)
    console.log(invoice.invoice_pdf)
    return invoice.invoice_pdf
  
    };

  }

