import { IConversation, IMessage } from "../../../entitties/interfaces/conversation/IMessage.ts";
import { IConversationRepository } from "../../../entitties/interfaces/conversation/ImessageRepository.ts";
import { ConversationModal } from "../models/chat/conversationModal.ts";
import { MessageModal } from "../models/chat/MessageModal.ts";
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
}