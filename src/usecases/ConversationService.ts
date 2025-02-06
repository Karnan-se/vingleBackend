import { ObjectId } from "mongoose"
import { IMessage } from "../entitties/interfaces/conversation/IMessage"
import { IConversationRepository } from "../entitties/interfaces/conversation/ImessageRepository"
import { io } from "../framework/web/utils/socketConfig.ts"
import { INotificationRepository } from "../entitties/interfaces/notification/INotificationRepository.ts"
import { INotification } from "../entitties/interfaces/notification/INotification.ts"


interface Dependency{
     Repository :{
        conversationRepository: IConversationRepository,
        notificationRepository: INotificationRepository
    }

}

export class ConversationService {
    private conversationRepository
    private notificationRepository
    constructor(dependency:Dependency){
        this.conversationRepository = dependency.Repository.conversationRepository
        this.notificationRepository = dependency.Repository.notificationRepository

    }

    async sendMessage(message:IMessage){
     try {
        const savedMessage = await this.conversationRepository.sendMessage(message)
        console.log(savedMessage , "kwnfkjwebkfjbkjefs saved message ")
        if(savedMessage){
            io.to(savedMessage.receiverId.toString()).emit("message",savedMessage)
            io.to(savedMessage.senderId.toString()).emit("message",savedMessage)
            const {senderId  , receiverId , } = savedMessage
            const notification : INotification = {
                type:"message",
                receiver:receiverId,
                sender:senderId,
            }
            const createNotification  = await this.notificationRepository.createNotification(notification);
            const findNotification  = await this.notificationRepository.findNotifications(createNotification.sender as ObjectId , createNotification!.receiver as ObjectId)
            // console.log(findNotification , "findNotificationnotifciationn")
            const recipientId = createNotification.receiver.toString(); 
            // console.log(recipientId , "rciepientID")
            io.to(recipientId).emit("notification", findNotification)    
        }
     
        
      
        const {senderId,receiverId, _id } = savedMessage
        const saveConversation = await this.conversationRepository.findandSaveConversation(senderId as unknown as  ObjectId, receiverId as unknown as ObjectId, _id!)
        // console.log(saveConversation , "new Conversation is created and saved")
        return savedMessage
        
     } catch (error) {
        console.log(error)
        throw error
        
     }
    }
    async fetchConversation(senderId: ObjectId, recieverId : ObjectId) {
        try {
            const  messages = await this.conversationRepository.fetchMessages(senderId ,  recieverId)
            // console.log(messages ,  "Messages")
            return messages
            
        } catch (error) {
            
        }
    }
    async getConversation(recieverId:ObjectId){
        try {
            const response = await this.conversationRepository.getConversation(recieverId)
            const userId  = response.map((response)=> response.participants.filter((participant)=>participant.toString() !=recieverId.toString()))
            const groupOfUserId =userId.flat()
            // console.log(groupOfUserId , "group")
            
            return groupOfUserId;
            
            
            
        } catch (error) {
            
        }
    }

    


    
}