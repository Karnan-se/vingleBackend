import { BaseRepository } from "./Base/BaseRepository.ts";
import { RevenueModal } from "../models/revenue/revenueModal.ts";
import { IRevenue } from "../../../entitties/interfaces/revenue/IRevenue.ts";
import { Types } from "mongoose";
import { IRevenueRepository } from "../../../entitties/interfaces/revenue/IRevenueRepository.ts";

export class RevenueRepository extends BaseRepository<IRevenue> implements IRevenueRepository{
    constructor(){
        super(RevenueModal)
    }
    async create(data: Partial<IRevenue>): Promise<IRevenue> {
        try {
            return await this.model.create(data) as unknown as IRevenue
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
        
    }


    async adminchartDetails(startDate: Date):Promise<any>{
       try {
        const start = new Date(startDate);
        const chartDetails = await RevenueModal.aggregate([{$match:{createdAt:{$gte:start}}},
            {$group:{_id:{
                day: { $dayOfMonth: "$createdAt" },
            },
            income: {$sum: "$adminRevenue"}
        }

        }
        ])
        console.log(chartDetails   , "chartDetails")
        return  chartDetails
        
       } catch (error) {
        console.log(error)
        throw error;
        
       }
    }


}
