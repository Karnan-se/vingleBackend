import { ICourse } from "../course/course";
import { IOrder } from "./Iorder";
import { ObjectId } from "mongoose";

export interface IOrderRepository  {
    createOrder(orderDetails:IOrder):Promise<IOrder> 
    orderPaymentUpdate(sessionId:string):Promise<IOrder>
    isOrderPlaced(userId:ObjectId, isOrderPlaced:ObjectId):Promise<IOrder | null>
    allUserOrder(userId:ObjectId):Promise<IOrder | null>
    findByCourse(courseId:ObjectId):Promise<IOrder[]>
    chartDetails():Promise<any>
    findOrderById(orderId:ObjectId):Promise<IOrder>
    updateOrder(order:IOrder):Promise<IOrder>
    getAllOrder():Promise<IOrder>
    PaginatedOrders(skip: number, limit: number , search :string , statusFilter : string): Promise<{ orders: IOrder[]; totalOrders: number }> 

}
