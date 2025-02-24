import { UserCourseService } from "../../../usecases/userCourseService.ts";
import { UserCourseController } from "../../../adapters/controller/userCourseController.ts";
import { UserCourseRepository} from "../../database/repositories/userCourseRepository.ts"
import {PaymentService} from "../../web/utils/stripe.ts";
import  { OrderRepository } from "../../database/repositories/orderRepository.ts";
import { PDFcreator } from "../../web/utils/pdfGenerator.ts";
import { CloudinaryService } from "../../web/utils/cloudinary.ts";
import { RevenueRepository } from "../../database/repositories/revenueRepository.ts";







const Repository ={
    courseRepository: new UserCourseRepository(),
    orderRepository : new OrderRepository(),
    pdfCreator : new PDFcreator(),
    revenueRepository : new RevenueRepository
}

const service = {
    paymentService : new PaymentService(),
    cloudinaryService: new CloudinaryService()
}
const userCourseService = new UserCourseService({Repository , service})

export const userCourseController = new UserCourseController({userCourseService})