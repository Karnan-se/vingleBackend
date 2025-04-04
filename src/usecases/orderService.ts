
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

    async PaginatedOrder(pageNumber=1 , search ="" , filterchage = "all"){
    try {
        const pageSize = 10
        console.log(pageNumber , "pageNumber")
        const skip = ((pageNumber - 1)* pageSize)
        const limit  = pageSize
        console.log(skip , "skip")
        const {orders, totalOrders } = await this.orderRepository.PaginatedOrders(skip , limit , search , filterchage)
        // console.log(totalOrders ,  "totalOrders" , orders)
        return {orders , totalOrders}  
    } catch (error) {
        console.log(error)
        throw error
        
    }
    }

    async SearchOrder(search:string, statusFilter :string){
        try {
            const orders =  this.orderRepository
            return orders
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }

}