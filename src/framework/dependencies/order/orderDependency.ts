import { OrderService } from "../../../usecases/orderService.ts";
import { OrderRepository } from "../../database/repositories/orderRepository.ts";
import { OrderController } from "../../../adapters/controller/orderController.ts";


const repository  ={
    orderRepository : new OrderRepository()
}

const orderService = new OrderService({repository})

export const orderController = new OrderController(orderService)

