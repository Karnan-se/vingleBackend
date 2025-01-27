import { IConversation, IMessage } from "./IMessage";
import { ObjectId } from "mongoose";

export interface IConversationRepository {
    sendMessage(message:IMessage):Promise<IMessage>
    saveConversation(conversation:IConversation):Promise<IConversation>
     findandSaveConversation(senderId:ObjectId, recieverId:ObjectId , _id:ObjectId):Promise<void>
}