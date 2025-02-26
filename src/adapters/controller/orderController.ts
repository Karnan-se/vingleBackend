import { Request , Response , NextFunction } from "express";
import { OrderService } from "../../usecases/orderService";



export class OrderController {
    private orderService
    constructor(useCase:OrderService){
        this.orderService = useCase
    }

    async getAllOrders(req:Request , res:Response , next:NextFunction){
        try {
            const orders = await this.orderService.getOrderDetails()
            console.log("orders")
            res.status(200).json({orders})
        } catch (error) {
            next(error)
            
        }
    }
}