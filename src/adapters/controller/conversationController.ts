import { Request , Response , NextFunction } from "express"
import { ConversationService } from "../../usecases/ConversationService"

interface UseCase{

}

export default class ConversationController {
    private conversationService
    constructor(useCase:ConversationService){
        this.conversationService =  useCase

    }

    async sendMessage (req:Request, res:Response , next:NextFunction){
    try {
        const {message} = req.body;
        const saveMessage =  await this.conversationService.sendMessage(message)
        console.log(saveMessage , "savedMessage")
        res.status(200).json({saveMessage })
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
    }

    async fetchMessage (req:Request , res:Response, next :NextFunction){
        try {
            const {senderId, receiverId} = req.body;
            console.log(senderId , receiverId ,  "sender amd reviever Id");
            const fetchedMessages = await this.conversationService.fetchConversation(senderId , receiverId)
            return res.status(200).json({fetchedMessages})

            
        } catch (error) {   
            console.log(error)
            next(error)
        }

    }
    async getConversation (req:Request, res:Response , next:NextFunction) {
        try {
            const {receiverId} = req.body;
            console.log(receiverId)
            const getConversation  = await this.conversationService.getConversation(receiverId)
            console.log(getConversation ,  "conversation is get Conversation");
            res.status(200).json({getConversation})
            
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }
}