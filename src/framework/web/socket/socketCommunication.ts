import { ObjectId } from "mongoose";
import NotificationRepository from "../../database/repositories/NotificationRepository.ts";



const notification = new NotificationRepository()


export const ReadNotification  = async(notificationSender:ObjectId , reciever:ObjectId)=>{
    try {
        const markRead = await notification.ReadNotification(notificationSender , reciever)
        console.log(markRead ,  "notification recieverd")
        
    } catch (error) {
        console.log(error)
        throw error
        
    }

}