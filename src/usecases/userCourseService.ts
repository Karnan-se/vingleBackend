import { IuserCourseRepository } from "../entitties/interfaces/course/IuserCourseRepository.ts";
import { IOrder } from "../entitties/interfaces/Iorder/Iorder.ts";
import { IOrderRepository } from "../entitties/interfaces/Iorder/IOrderRespository.ts";
import { IPaymentService } from "../entitties/interfaces/service.ts/IPaymentService.ts";
import { ObjectId } from "mongoose";
import { Iuser } from "../entitties/interfaces/user/user.ts";
import AppError from "../framework/web/utils/appError.ts";
import { ICourse } from "../entitties/interfaces/course/course.ts";
interface Dependency {
  Repository: {
    courseRepository: IuserCourseRepository;
    orderRepository: IOrderRepository;
  };
  service: {
    paymentService: IPaymentService;
  };
}

export class UserCourseService {
  private course;
  private paymentService;
  private OrderService;

  constructor(dependency: Dependency) {
    this.course = dependency.Repository.courseRepository;
    this.paymentService = dependency.service.paymentService;
    this.OrderService = dependency.Repository.orderRepository;
  }

  async getAllCourse() {
    const courses = await this.course.getAllCourse();
    return courses;
  }

  async payementPage(price: number, courseName: string, courseImage: string , userInfo:Iuser , course:ICourse) {
    try {

     

      if (!userInfo || !userInfo._id) {
        throw AppError.conflict("User information or ID is missing");
      }

      const isbroughtalready = await this.OrderService.isOrderPlaced(
        userInfo!._id , course!._id as ObjectId
      );
      if(isbroughtalready){
       throw AppError.conflict("course already Brought")
      }
    
      if(isbroughtalready){
        return 
      }
      const session = await this.paymentService.checkoutPage(
        price,
        courseName,
        courseImage
      );

      return { url: session.url, sessionId: session.id };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async createOrder(order: IOrder) {
    
    const orders = await this.OrderService.createOrder(order);
    return orders;
  }
  async paymentverify(userInfo: Iuser, sessionId: string) {
    try {
      
      const isPaymentSuccess = await this.paymentService.ispaymentverified(
        sessionId
      );
      if (isPaymentSuccess) {
        console.log("payment success");
        const getInvoice = await this.paymentService.getInvoice(
          isPaymentSuccess,
          userInfo
        );
        if (getInvoice) {
          const updateOrder = await this.OrderService.orderPaymentUpdate(
            getInvoice,
            sessionId
          );
          return updateOrder;
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
