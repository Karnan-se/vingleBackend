import { ObjectId } from "mongoose";

export interface IMessage {
    _id?:ObjectId
    senderId :string,
    receiverId:string,
    type?:string,
    message:string, 
}

export interface IConversation {
    participants :string[] | ObjectId[],
    messages:ObjectId[]
}

