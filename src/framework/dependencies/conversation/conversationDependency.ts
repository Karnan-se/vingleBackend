import { ConversationService } from "../../../usecases/ConversationService.ts";
import ConversationController from "../../../adapters/controller/conversationController.ts";
import { ConversationRepository } from "../../database/repositories/ConversationRepository.ts";

const Repository = {
    conversationRepository : new ConversationRepository
}


const conversationService = new ConversationService({Repository})

export const conversationController = new ConversationController(conversationService)