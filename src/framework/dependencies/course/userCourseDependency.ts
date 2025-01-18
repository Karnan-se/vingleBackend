import { UserCourseService } from "../../../usecases/userCourseService.ts";
import { UserCourseController } from "../../../adapters/controller/userCourseController.ts";
import { UserCourseRepository} from "../../database/repositories/userCourseRepository.ts"
import {PaymentService} from "../../web/utils/stripe.ts";
import  { OrderRepository } from "../../database/repositories/orderRepository.ts";







const Repository ={
    courseRepository: new UserCourseRepository(),
    orderRepository : new OrderRepository
}
const service = {
    paymentService : new PaymentService()
}
const userCourseService = new UserCourseService({Repository , service})

export const userCourseController = new UserCourseController({userCourseService})