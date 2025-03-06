import { Request , Response , NextFunction } from "express";
import { OrderService } from "../../usecases/orderService";
import { HttpStatus } from "../../entitties/Enums/statusCode.ts";



export class OrderController {
    private orderService
    constructor(useCase:OrderService){
        this.orderService = useCase
    }

    async getAllOrders(req:Request , res:Response , next:NextFunction){
        try {
            const orders = await this.orderService.getOrderDetails()
            console.log("orders")
            res.status(HttpStatus.OK).json({orders})
        } catch (error) {
            next(error)
            
        }
    }
}