import Stripe from "stripe";
import { Iuser } from "../user/user";

export interface IPaymentService {
  stripePayment(
    amount: number,
    currency?: string,
    metadata?: Record<string, any>
  ): Promise<void>;

  checkoutPage(
    price: number,
    courseName: string,
    courseImage:string,
  ): Promise<Stripe.Checkout.Session>;

  ispaymentverified(sessionId:string):Promise<Stripe.Checkout.Session>
  getInvoice(session:Stripe.Checkout.Session , userInfo:Iuser):Promise<any>
}
