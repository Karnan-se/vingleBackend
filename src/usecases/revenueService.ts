import { ObjectId } from "mongoose";
import { ICourseRepository } from "../entitties/interfaces/course/IcouseRepository";
import { IOrderRepository } from "../entitties/interfaces/Iorder/IOrderRespository";

interface Dependency {
  repository: {
    courseRepository: ICourseRepository;
    orderRepositiory: IOrderRepository;
  };
}

export class RevenueService {
    private CourseRepository
    private OrderRepository
  constructor(dependency: Dependency) {
    this.CourseRepository = dependency.repository.courseRepository
    this.OrderRepository = dependency.repository.orderRepositiory
  }

  async getrevenue(tutorId: ObjectId) {
    const courses = await this.CourseRepository.tutorsCourse(tutorId)
    console.log(courses , "coursess ");
    const courseOrders = await  Promise.all(
        courses .map( async (course)=> await this.OrderRepository.findByCourse(course._id as unknown as ObjectId) ) )

    const revenueData = courses.map((course, index)=> {
        const orders  = courseOrders[index];
        console.log(orders , "orders  orders")
        const students = orders.length;
        const price = typeof course.price === "number" ? course.price : parseFloat(course.price);
        const totalRevenue = students * (price || 0);

        return {
            id: index + 1,   
            name:course.name,
            thumbnail: course.thumbnail,
            students,
            rate:price || 0,
            uploadedDate: (course as any).createdAt ? new Date((course as any).createdAt).toISOString().split("T")[0] : "Unknown",
            totalRevenue
        }
        
    })
    console.log(revenueData , "revenueData revenueData")
    return revenueData

  }
}
