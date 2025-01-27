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
}