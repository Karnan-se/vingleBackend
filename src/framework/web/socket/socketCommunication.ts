import { ObjectId } from "mongoose";
import NotificationRepository from "../../database/repositories/NotificationRepository";
import { ConversationRepository } from "../../database/repositories/ConversationRepository";
import { IMessage } from "../../../entitties/interfaces/conversation/IMessage";
import {INotification} from "../../../entitties/interfaces/notification/INotification"
import { Socket } from "socket.io";


const conversationRepostiory  = new ConversationRepository()
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

 export const saveMessage = async(message:IMessage , socket:Socket ,onlineUser: Record<string, string>  )=>{
    try {
        const savedMessage = await conversationRepostiory.sendMessage(message)
        const {_id, receiverId , senderId} = savedMessage
        const saveConversation = await conversationRepostiory.findandSaveConversation(senderId as unknown as  ObjectId, receiverId as unknown as ObjectId, _id!)
         const notificationData : INotification = {
                        type:"message",
                        receiver:receiverId,
                        sender:senderId,
                    }

                    const createNotification  = await notification.createNotification(notificationData);
                     const findNotification = await notification.findNotifications(createNotification.sender as ObjectId , createNotification!.receiver as ObjectId)
                     const recipientId = createNotification.receiver.toString(); 
                     console.log(onlineUser[receiverId] , findNotification  ,  "notiication")
                     socket.to(onlineUser[receiverId]).emit("notification" , findNotification)
                     

        console.log(savedMessage)
        return savedMessage
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
 }