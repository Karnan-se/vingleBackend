import Stripe from "stripe";

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
}
