import { IcalAttachment } from "nodemailer/lib/mailer/index";
import { IConversation, IMessage } from "../../../entitties/interfaces/conversation/IMessage";
import { IConversationRepository } from "../../../entitties/interfaces/conversation/ImessageRepository";
import { ConversationModal } from "../models/chat/conversationModal";
import { MessageModal } from "../models/chat/MessageModal";
import { ObjectId } from "mongoose";

export class ConversationRepository implements IConversationRepository{
    constructor(){}
    async sendMessage(message: IMessage): Promise<IMessage> {
       try {
        const savedMessage = await MessageModal.create(message)
        return savedMessage as unknown as IMessage
       } catch (error) {
        console.log(error)
        throw error;
       }
        
    }
    async saveConversation(conversation: IConversation): Promise<IConversation> {
        try {
            const saveConversation = await ConversationModal.create(conversation)
            console.log(saveConversation , "saveConversation")
            return saveConversation as unknown as IConversation
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
        
    }
    async  findandSaveConversation(senderId:ObjectId, recieverId:ObjectId , _id:ObjectId){
        try {
            const conversation = await ConversationModal.aggregate([{$match:{participants:{$all:[senderId , recieverId]}}}])
            if(conversation.length> 0){
              
                const updateConversation = await ConversationModal.updateOne({participants:{$all:[senderId, recieverId]}}, {$addToSet:{ messages: _id }})
                console.log( updateConversation, "conversation already exists and updated the message ")
            }else{
                let conversation = {
                   participants: [senderId, recieverId],
                   messages:[_id]
                }
                const saveConversation = await this.saveConversation(conversation)

            }
            
        } catch (error) {
            console.log(error);
            throw error
            
        }

    }
    async fetchMessages(senderId:ObjectId, recieverId :ObjectId):Promise<IConversation> {
        const conversation  = await ConversationModal.findOne({participants:{$all:[senderId , recieverId]}}).populate("messages")
        return conversation as unknown as  IConversation
        
    }
    async getConversation(recieverId: ObjectId): Promise<IConversation[]> {
        try {
        const conversation = await ConversationModal.find({participants:{$in:[recieverId]}}).populate("messages")
        return conversation as unknown as  IConversation[]
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
        
    }
}