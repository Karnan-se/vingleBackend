import { RevenueService } from "../../../usecases/revenueService";
import CourseRepository from "../../database/repositories/CourseRepository";
import { OrderRepository } from "../../database/repositories/orderRepository";
import { RevenueController } from "../../../adapters/controller/RevenueController";
import { RevenueRepository } from "../../database/repositories/revenueRepository";


const repository = {
    courseRepository : new CourseRepository(),
    orderRepositiory : new OrderRepository(),
    revenueRepository : new RevenueRepository()
}

const revenueService = new RevenueService({repository})

export const revenueController = new RevenueController(revenueService)