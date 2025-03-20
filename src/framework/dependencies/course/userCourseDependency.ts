import { UserCourseService } from "../../../usecases/userCourseService";
import { UserCourseController } from "../../../adapters/controller/userCourseController";
import { UserCourseRepository} from "../../database/repositories/userCourseRepository"
import {PaymentService} from "../../web/utils/stripe";
import  { OrderRepository } from "../../database/repositories/orderRepository";
import { PDFcreator } from "../../web/utils/pdfGenerator";
import { CloudinaryService } from "../../web/utils/cloudinary";
import { RevenueRepository } from "../../database/repositories/revenueRepository";







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