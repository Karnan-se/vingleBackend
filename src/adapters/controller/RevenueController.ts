import { Request , Response , NextFunction } from "express";
import { RevenueService } from "../../usecases/revenueService";
import { HttpStatus } from "../../entitties/Enums/statusCode";
export class RevenueController {
    private RevenueService
    constructor(useCase  : RevenueService) {
        this.RevenueService = useCase

    }


    async  getRevenue (req :Request, res:Response, next: NextFunction) {
       try {
        const {tutorId} = req.body
        // console.log(tutorId , "tutorId")
        const revenue = await this.RevenueService.getrevenue(tutorId)
        // console.log(revenue , "revenuess revenue revenue ")
        res.status(HttpStatus.OK).json({revenue}) 
       } catch (error) {
        console.log(error)
        next(error)
        
       }
    }
    async chartDetails(req: Request , res:Response , next:NextFunction){
        try {
            const chart = await this.RevenueService.chartDetails()
            console.log(chart ,  "chart chart")
            res.status(HttpStatus.OK).json({chart})
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async adminChartDetails(req:Request , res:Response , next:NextFunction){
        try {
            const {startDate} = req.query
            const start = new Date(startDate as string);
            const adminChart = await this.RevenueService.fetchAdminRevenue(start)
            res.status(HttpStatus.OK).json({adminChart})

            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async adminRevenue(req:Request , res:Response , next: NextFunction){
        try {
            const revenue = await this.RevenueService.adminRevenue()
            res.status(HttpStatus.OK).json({revenue})
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }
}