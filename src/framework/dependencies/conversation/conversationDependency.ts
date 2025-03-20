import { ConversationService } from "../../../usecases/ConversationService";
import ConversationController from "../../../adapters/controller/conversationController";
import { ConversationRepository } from "../../database/repositories/ConversationRepository";
import NotificationRepository from "../../database/repositories/NotificationRepository";

const Repository = {
    conversationRepository : new ConversationRepository,
    notificationRepository : new NotificationRepository
}


const conversationService = new ConversationService({Repository})

export const conversationController = new ConversationController(conversationService)