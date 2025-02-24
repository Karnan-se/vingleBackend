import { RevenueService } from "../../../usecases/revenueService.ts";
import CourseRepository from "../../database/repositories/CourseRepository.ts";
import { OrderRepository } from "../../database/repositories/orderRepository.ts";
import { RevenueController } from "../../../adapters/controller/RevenueController.ts";
import { RevenueRepository } from "../../database/repositories/revenueRepository.ts";


const repository = {
    courseRepository : new CourseRepository(),
    orderRepositiory : new OrderRepository(),
    revenueRepository : new RevenueRepository()
}

const revenueService = new RevenueService({repository})

export const revenueController = new RevenueController(revenueService)