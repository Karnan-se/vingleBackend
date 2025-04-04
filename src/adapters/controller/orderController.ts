import { Request , Response , NextFunction } from "express";
import { OrderService } from "../../usecases/orderService";
import { HttpStatus } from "../../entitties/Enums/statusCode";
import AppError from "../../framework/web/utils/appError";



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
    async paginatedOrders(req: Request , res:Response , Next:NextFunction){
        try {
            const {pageNumber , search , filterChange} = req.query
       
          
    
            const pagenumber = (pageNumber) 
            const {orders , totalOrders } = await this.orderService.PaginatedOrder(pagenumber as unknown as  number , search as string , filterChange as string )
            
            res.status(HttpStatus.OK).json({orders  , totalOrders})

        } catch (error) {
            console.log(error)
            Next(error)
            
        }
    
    }
}

