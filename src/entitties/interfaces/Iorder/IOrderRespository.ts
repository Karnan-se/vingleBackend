import { ICourse } from "../course/course";
import { IOrder } from "./Iorder";
import { ObjectId } from "mongoose";

export interface IOrderRepository  {
    createOrder(orderDetails:IOrder):Promise<IOrder> 
    orderPaymentUpdate(getInvoice:string , sessionId:string):Promise<IOrder>
    isOrderPlaced(userId:ObjectId, isOrderPlaced:ObjectId):Promise<IOrder | null>
    allUserOrder(userId:ObjectId):Promise<IOrder | null>
    findByCourse(courseId:ObjectId):Promise<IOrder[]>
    chartDetails():Promise<any>

}