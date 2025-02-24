import { IRevenue } from "./IRevenue"


export interface IRevenueRepository {
    create(data: Partial<IRevenue>): Promise<IRevenue> 
    adminchartDetails(startDate: Date):Promise<any>
}