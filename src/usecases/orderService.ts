
import { IOrderRepository } from "../entitties/interfaces/Iorder/IOrderRespository"

interface Dependency {
    repository :{
        orderRepository : IOrderRepository
    }

}

export class OrderService {
    private orderRepository
    constructor(dependency:Dependency){
        this.orderRepository = dependency.repository.orderRepository

    }

    async getOrderDetails(){
     try {
        const allOrders = await  this.orderRepository.getAllOrder();
        return allOrders
        
     } catch (error) {
        console.log(error)
        throw error
        
     }
    }

}