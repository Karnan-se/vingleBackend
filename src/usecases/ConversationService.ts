import { ObjectId } from "mongoose"
import { IMessage } from "../entitties/interfaces/conversation/IMessage"
import { IConversationRepository } from "../entitties/interfaces/conversation/ImessageRepository"


interface Dependency{
     Repository :{
        conversationRepository: IConversationRepository
    }

}

export class ConversationService {
    private conversationRepository
    constructor(dependency:Dependency){
        this.conversationRepository = dependency.Repository.conversationRepository

    }

    async sendMessage(message:IMessage){
     try {
        const savedMessage = await this.conversationRepository.sendMessage(message)
        console.log(savedMessage)
        const {senderId,receiverId, _id } = savedMessage
        const saveConversation = await this.conversationRepository.findandSaveConversation(senderId as unknown as  ObjectId, receiverId as unknown as ObjectId, _id!)
        console.log(saveConversation , "new Conversation is created and saved")
        return savedMessage
        
     } catch (error) {
        console.log(error)
        throw error
        
     }
    }
    async fetchConversation(senderId: ObjectId, recieverId : ObjectId) {
        try {
            const  messages = await this.conversationRepository.fetchMessages(senderId ,  recieverId)
            console.log(messages ,  "Messages")
            return messages
            
        } catch (error) {
            
        }
    }
    async getConversation(recieverId:ObjectId){
        try {
            const response = await this.conversationRepository.getConversation(recieverId)
            const userId  = response.map((response)=> response.participants.filter((participant)=>participant.toString() !=recieverId.toString()))
            const groupOfUserId =userId.flat()
            console.log(groupOfUserId , "group")
            return groupOfUserId;
            
            
            
        } catch (error) {
            
        }
    }
}