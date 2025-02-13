import { IOrder } from "../../../entitties/interfaces/Iorder/Iorder.ts";
import { OrderModal } from "../models/course/OrderModal.ts";
import { IOrderRepository } from "../../../entitties/interfaces/Iorder/IOrderRespository.ts";
import { ObjectId } from "mongoose";

export class OrderRepository implements IOrderRepository {
  constructor() {}

  async createOrder(orderDetails: IOrder): Promise<IOrder> {
    try {
      const isOrdered = await OrderModal.findOne({
        userId: orderDetails.userId,
        courseId: orderDetails.courseId,
      });
      if (isOrdered) {
        console.log("order is already there those payments were pending");
        return isOrdered as unknown as IOrder;
      }
      console.log("new Order is created");

      const orders = await OrderModal.create(orderDetails);
      return orders as unknown as IOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async orderPaymentUpdate(
    getInvoice: string,
    sessionId: string
  ): Promise<IOrder> {
    try {
      const update = await OrderModal.findOneAndUpdate(
        { paymentId: sessionId },
        { $set: { paymentStatus: "Completed", invoice: getInvoice } },
        { new: true }
      );
      return update as unknown as IOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async isOrderPlaced(userId: ObjectId,courseId: ObjectId): Promise<IOrder | null> {
    try {
      console.log("isOrderPlaced");
      const order = await OrderModal.findOne({userId: userId,courseId: courseId, paymentStatus: "Completed", }).populate(["courseId" , "userId"]);
      if (order) {
        console.log(order, "Order");
        return order as unknown as IOrder;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
 async allUserOrder(userId: ObjectId): Promise<IOrder | null> {
    console.log(userId)
    const order = await OrderModal.find({ userId: userId }).populate([
      {
        path: "courseId",
        populate: [
          {
            path: "tutorId",
          
          },
          {
            path: "category",
          },
          {
            path: "sections",
            populate: {
              path: "items", 
            },
          },
        ],
      },
      {
        path: "userId", 
        select: "_id name email", 
      },
    ]);
    ;
      if(order){
        console.log("order ," , order)
        return order as unknown as IOrder
      }else{
        return null
      }
  }

  async findByCourse(courseId:ObjectId):Promise<IOrder[]>{
   try {
    const orderDetails = await OrderModal.find({courseId : courseId})
    return orderDetails as unknown as IOrder[]
    
   } catch (error) {
    console.log(error)
    throw error
    
   }
    
  }
}
