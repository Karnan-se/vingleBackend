import { OrderService } from "../../../usecases/orderService";
import { OrderRepository } from "../../database/repositories/orderRepository";
import { OrderController } from "../../../adapters/controller/orderController";


const repository  ={
    orderRepository : new OrderRepository()
}

const orderService = new OrderService({repository})

export const orderController = new OrderController(orderService)

