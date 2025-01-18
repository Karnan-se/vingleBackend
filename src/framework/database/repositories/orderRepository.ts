import { IOrder } from "../../../entitties/interfaces/Iorder/Iorder.ts"
import { OrderModal } from "../models/course/OrderModal.ts"
import { IOrderRepository } from "../../../entitties/interfaces/Iorder/IOrderRespository.ts"
import { ObjectId } from "mongoose"



export class OrderRepository implements IOrderRepository{
    constructor(){}

    async createOrder(orderDetails:IOrder):Promise<IOrder>{
        try {
            const isOrdered = await OrderModal.findOne({userId:orderDetails.userId, courseId:orderDetails.courseId})
            if(isOrdered){
                console.log("order is already there those payments were pending")
                return isOrdered as IOrder
            }
            console.log("new Order is created")
            
            const  orders = await OrderModal.create(orderDetails)
            return orders as IOrder
        } catch (error) {
            console.log(error)
            throw error;

        }
   
    }
    async orderPaymentUpdate(getInvoice: string, sessionId:string): Promise<IOrder> {
        try {
            const update = await OrderModal.findOneAndUpdate({paymentId:sessionId}, {$set:{paymentStatus:"Completed", invoice:getInvoice}},{new:true})
            return update as IOrder
        } catch (error) {
            console.log(error)
            throw error
            
        }
       

    }
    async isOrderPlaced(userId: ObjectId,courseId:ObjectId  ):Promise<IOrder | null> {
        try {
            console.log("isOrderPlaced")
            const order = await OrderModal.findOne({userId:userId, courseId:courseId , paymentStatus:"Completed" })
            if(order){
                console.log(order, "Order")
                return order as IOrder
            }else{
                return null
            }
            
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
       
        
    }

}