import { UserCourseService } from "../../../usecases/userCourseService.ts";
import { UserCourseController } from "../../../adapters/controller/userCourseController.ts";
import { UserCourseRepository} from "../../database/repositories/userCourseRepository.ts"
import {PaymentService} from "../../web/utils/stripe.ts";







const Repository ={
    courseRepository: new UserCourseRepository()
}
const service = {
    paymentService : new PaymentService()
}
const userCourseService = new UserCourseService({Repository , service})

export const userCourseController = new UserCourseController({userCourseService})