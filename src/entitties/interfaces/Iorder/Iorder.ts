import { ObjectId } from "mongoose";

export interface IOrder {
    userId: ObjectId;
    courseId: ObjectId;
    totalAmount: number;
    paymentId: string;
    paymentStatus?: 'Pending' | 'Completed' | 'Failed';
    invoice?:string,
    createdAt?: Date; 
    updatedAt?: Date; 
  }
  