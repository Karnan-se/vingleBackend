import mongoose, {Schema} from "mongoose"

const conversationSchema = new mongoose.Schema({
    participants:[
        { type:mongoose.Schema.Types.ObjectId,
            
        }

    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]

},{timestamps:true})

export const ConversationModal = mongoose.model("Conversation", conversationSchema)