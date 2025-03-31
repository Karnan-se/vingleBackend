import { ObjectId } from "mongoose";
import { ICourseRepository } from "../entitties/interfaces/course/IcouseRepository";
import { IOrderRepository } from "../entitties/interfaces/Iorder/IOrderRespository";
import { IRevenueRepository } from "../entitties/interfaces/revenue/IRevenueRepository";
import { IOrder } from "../entitties/interfaces/Iorder/Iorder";
import { IRevenue } from "../entitties/interfaces/revenue/IRevenue";

interface Dependency {
  repository: {
    courseRepository: ICourseRepository;
    orderRepositiory: IOrderRepository;
    revenueRepository : IRevenueRepository
  };
}

export class RevenueService {
    private CourseRepository
    private OrderRepository
    private RevenueRepository
  
  constructor(dependency: Dependency) {
    this.CourseRepository = dependency.repository.courseRepository
    this.OrderRepository = dependency.repository.orderRepositiory
    this.RevenueRepository = dependency.repository.revenueRepository
  }

  async getrevenue(tutorId: ObjectId) {
    const courses = await this.CourseRepository.tutorsCourse(tutorId)
    console.log(courses , "coursess ");
    const courseOrders = await  Promise.all(
        courses .map( async (course)=> await this.OrderRepository.findByCourse(course._id as unknown as ObjectId) ) )

    const revenueData = courses.map((course, index)=> {
        const orders  = courseOrders[index];
        console.log((course as any)?.category?.name , "orders  orders")
        
        const students = orders.length;
        const price = typeof course.price === "number" ? course.price : parseFloat(course.price);
        const totalRevenue = students * (price || 0);

        return {
            id: index + 1,   
            name:course.name,
            thumbnail: course.thumbnail,
            students,
            category : (course  as any)?.category?.name,
            rate:price || 0,
            uploadedDate: (course as any).createdAt ? new Date((course as any).createdAt).toISOString().split("T")[0] : "Unknown",
            totalRevenue
        }
        
    })
    
    return revenueData

  }

  async getadminRevenue(){
    const courses = await this.CourseRepository.getAllCourseFromDataBase();
    console.log(courses , "coursess ");
    const courseOrders = await  Promise.all(
      courses.map( async (course)=> await this.OrderRepository.findByCourse(course._id as unknown as ObjectId) ) )

      const revenueData = courses.map((course, index)=> {
        const orders  = courseOrders[index];
        console.log((course as any)?.category?.name , "orders  orders")
        
        const students = orders.length;
        const price = typeof course.price === "number" ? course.price : parseFloat(course.price);
        const totalRevenue = students * (price || 0);

        return {
            id: index + 1,   
            name:course.name,
            thumbnail: course.thumbnail,
            students,
            category : (course  as any)?.category?.name,
            rate:price || 0,
            uploadedDate: (course as any).createdAt ? new Date((course as any).createdAt).toISOString().split("T")[0] : "Unknown",
            totalRevenue
        }
        
    })
    console.log(revenueData ,  "admin's Revenue Data")
    
    return revenueData



  }

  async chartDetails(){
    interface MonthlyIncome {
      _id :number ,
      income:number
    }
     const monthlyIncome : MonthlyIncome[]  = await this.OrderRepository.chartDetails()
     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

     const chartData = monthlyIncome.map(({ _id, income }) => ({
      name: monthNames[_id - 1], 
      income
    }));
    console.log(chartData  , "chartData")
    return chartData
    
  }
  async CreateRevenue(revenue:IRevenue):Promise<IRevenue>{
    try {
      const createdRevenue = await this.RevenueRepository.create(revenue)
      return createdRevenue as unknown as IRevenue
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
   
  }
  async fetchAdminRevenue(startDate:Date):Promise<any> {
    try {
      interface IRevenueItem {
        _id: { day: number };
        income: number;
      }
      const revenue : IRevenueItem[]= await this.RevenueRepository.adminchartDetails(startDate)

    const adminRevenue = revenue.map(({_id, income})=> ({
      day:_id.day,
      income:income
    }))
      console.log(adminRevenue , "adminRevenue")
      return adminRevenue
      
    
    } catch (error) {
      console.log(error)
      throw error

      
    }
  }

  async adminRevenue():Promise<any> {
   try {
    const revenue = await this.RevenueRepository.getAdminRevenue()
    const Totalrevenue = await this.RevenueRepository.totalRevenue();
    const totalCourse  = (await this.CourseRepository.getAllCourseFromDataBase()).length

    const totalSum = revenue[0].totalSum;
    

    const revenueS ={
      revenue :totalSum,
      totalSales : Totalrevenue,
      totalCourse:totalCourse
    }

    console.log(revenueS , "revenueS")
    return revenueS

   } catch (error) {
    console.log(error)
    throw error
    
   }
  } 
}
