import { ObjectId } from "mongoose";

export interface IMessage {
    _id?:ObjectId
    senderId :string,
    receiverId:string,
    message:string, 
}

export interface IConversation {
    participants :string[] | ObjectId[],
    messages:ObjectId[]
}

