export interface IOrder {
    userId: string;
    courseId: string;
    totalAmount: number;
    paymentId: string;
    paymentStatus?: 'Pending' | 'Completed' | 'Failed';
    invoice?:string,
    createdAt?: Date; 
    updatedAt?: Date; 
  }
  