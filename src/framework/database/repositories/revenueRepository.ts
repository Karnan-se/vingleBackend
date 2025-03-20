import { BaseRepository } from "./Base/BaseRepository";
import { RevenueModal } from "../models/revenue/revenueModal";
import { IRevenue } from "../../../entitties/interfaces/revenue/IRevenue";
import { IRevenueRepository } from "../../../entitties/interfaces/revenue/IRevenueRepository";
import { OrderRepository } from "./orderRepository";
import { OrderModal } from "../models/course/OrderModal";


export class RevenueRepository
  extends BaseRepository<IRevenue>
  implements IRevenueRepository
{
  constructor() {
    super(RevenueModal);
  }
  async create(data: Partial<IRevenue>): Promise<IRevenue> {
    try {
      return (await this.model.create(data)) as unknown as IRevenue;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async adminchartDetails(startDate: Date): Promise<any> {
    try {
      const start = new Date(startDate);
      const chartDetails = await RevenueModal.aggregate([
        { $match: { createdAt: { $gte: start } } },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
            },
            income: { $sum: "$adminRevenue" },
          },
        },
      ]);
      console.log(chartDetails, "chartDetails");
      return chartDetails;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAdminRevenue(): Promise<any> {
    try {
      const adminRevenue = await RevenueModal.aggregate([
        {
          $group: {
            _id: null,
            totalSum: { $sum: "$adminRevenue" },
          },
        },
      ]);
      console.log(adminRevenue, "adminRevenu ewkddlkewfk");
      return adminRevenue;
    } catch (error) {
        console.log(error)
        throw error
    }
  }
  async totalRevenue():Promise<any> {
    try {
        const totalRevenue = await OrderModal.aggregate([{$group:{_id:null, totalSum:{$sum:"$totalAmount"}}}])
        console.log(totalRevenue[0].totalSum , "TotalRevenue")
        return totalRevenue[0].totalSum
    } catch (error) {
        console.log(error)
        throw error;
        
    }
  }
}
