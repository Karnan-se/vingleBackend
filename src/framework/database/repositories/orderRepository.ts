import { IOrder } from "../../../entitties/interfaces/Iorder/Iorder";
import { OrderModal } from "../models/course/OrderModal";
import { IOrderRepository } from "../../../entitties/interfaces/Iorder/IOrderRespository";
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
        console.log("order is already purchased");
        return isOrdered as unknown as IOrder;
      }

      const orders = await OrderModal.create(orderDetails);
      return orders as unknown as IOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async orderPaymentUpdate(
    sessionId: string
  ): Promise<IOrder> {
    try {
      const update = await OrderModal.findOneAndUpdate(
        { paymentId: sessionId },
        { $set: { paymentStatus: "Completed", } },
        { new: true }
      );
      return update as unknown as IOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async isOrderPlaced(
    userId: ObjectId,
    courseId: ObjectId
  ): Promise<IOrder | null> {
    try {
      console.log("isOrderPlaced");
      const order = await OrderModal.findOne({
        userId: userId,
        courseId: courseId,
        paymentStatus: "Completed",
      }).populate(["courseId", "userId"]);
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
    console.log(userId);
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
    if (order) {
      console.log("order ,", order);
      return order as unknown as IOrder;
    } else {
      return null;
    }
  }

  async findByCourse(courseId: ObjectId): Promise<IOrder[]> {
    try {
      const orderDetails = await OrderModal.find({ courseId: courseId });
      return orderDetails as unknown as IOrder[];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async chartDetails(): Promise<any> {
    try {
      console.log(" it is chart details of  User")
      const monthlyIncome = await OrderModal.aggregate([
        {
          $match: { paymentStatus: "Completed" },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            income: { $sum: "$totalAmount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      console.log(monthlyIncome, "monthly income ...");

      return monthlyIncome;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findOrderById(orderId: ObjectId): Promise<IOrder> {
    try {
      const orderDetails = await OrderModal.findOne({ _id: orderId }).populate([
        {
          path: "courseId",
        },
        {
          path: "userId",
        },
      ]);
      return orderDetails as unknown as IOrder;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(order:IOrder):Promise<IOrder>{
    try {
      const updatedOrder = await OrderModal.findOneAndUpdate({_id:(order as any)._id} , {$set:{...order}},{new:true});
      console.log(updatedOrder)
      return updatedOrder as unknown as IOrder
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }

  async getAllOrder():Promise<IOrder> {
    try {
      const order = await OrderModal.find().populate([
        {path: "courseId",
          populate:[{
            path: "tutorId"
          }]
          
        },
        {path: "userId"}
      ]);
      return order as unknown as IOrder

      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }
  
}
