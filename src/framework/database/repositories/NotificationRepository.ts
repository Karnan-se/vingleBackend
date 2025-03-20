import { ObjectId } from "mongoose";
import { INotification } from "../../../entitties/interfaces/notification/INotification";
import { INotificationRepository } from "../../../entitties/interfaces/notification/INotificationRepository";
import NotificationModal from "../models/Notification/NotificationModal";


class NotificationRepository implements INotificationRepository {
    constructor() {
  
    }
    async createNotification(notification:INotification):Promise<INotification>{
       try {
        const createNotification  = await  NotificationModal.create(notification)
        return createNotification as unknown as INotification
        
       } catch (error) {
        console.log(error)
        throw error
        
       }

    }
    async findNotifications(senderId:ObjectId, recieverId:ObjectId):Promise<INotification>{
        try {
            const findNotification = await NotificationModal.find({sender:senderId , receiver :recieverId , isRead:false})
            return findNotification as unknown as  INotification
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }
    async ReadNotification(senderId:ObjectId , recieverId:ObjectId):Promise<INotification>{
        try {
            const updateNotification = await NotificationModal.updateMany({sender:senderId , receiver:recieverId},{$set:{isRead:true}})
            console.log(updateNotification)
            return updateNotification as unknown as INotification
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }
}


export default NotificationRepository