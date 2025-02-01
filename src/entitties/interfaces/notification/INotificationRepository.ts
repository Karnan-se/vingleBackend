import { INotification } from "./INotification";
import { ObjectId } from "mongoose";

export interface INotificationRepository {
  createNotification(notification: INotification): Promise<INotification>;
  findNotifications(senderId:ObjectId, recieverId:ObjectId):Promise<INotification>
  ReadNotification(senderId:ObjectId , recieverId:ObjectId):Promise<INotification>
}
