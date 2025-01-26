import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const MessageModal = mongoose.model("Message", MessageSchema)