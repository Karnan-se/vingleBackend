import { Request , Response , NextFunction } from "express";
import { RevenueService } from "../../usecases/revenueService";

export class RevenueController {
    private RevenueService
    constructor(useCase  : RevenueService) {
        this.RevenueService = useCase

    }


    async  getRevenue (req :Request, res:Response, next: NextFunction) {
       try {
        const {tutorId} = req.body
        console.log(tutorId , "tutorId")
        const revenue = await this.RevenueService.getrevenue(tutorId)
        console.log(revenue , "revenuess revenue revenue ")
        res.status(200).json({revenue}) 
       } catch (error) {
        console.log(error)
        throw error
        
       }
    }
}