import { ObjectId } from "mongoose";

export interface INotification {
    isRead ?: boolean;
    type: "message" | "system" | "other";
    content?: string;
    sender: string | ObjectId; 
    receiver: string | ObjectId; 
    createdAt?: Date;
    updatedAt?: Date;
  }
  