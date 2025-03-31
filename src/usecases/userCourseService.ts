import { IuserCourseRepository } from "../entitties/interfaces/course/IuserCourseRepository";
import { IOrder } from "../entitties/interfaces/Iorder/Iorder";
import { IOrderRepository } from "../entitties/interfaces/Iorder/IOrderRespository";
import { ObjectId } from "mongoose";
import { Iuser } from "../entitties/interfaces/user/user";
import AppError from "../framework/web/utils/appError";
import { ICourse } from "../entitties/interfaces/course/course";
import { IInvoiceData } from "../entitties/interfaces/Invoice/Invoice";
import { IPDFCreator } from "../entitties/interfaces/Invoice/IPDFcreator";
import { IRevenueRepository } from "../entitties/interfaces/revenue/IRevenueRepository";
import { IRevenue } from "../entitties/interfaces/revenue/IRevenue";
import { ICloudinaryService } from "../entitties/interfaces/service.ts/IcloudinaryService";
import { IPaymentService } from "../entitties/interfaces/service.ts/IPaymentService";

interface Dependency {
  Repository: {
    courseRepository: IuserCourseRepository;
    orderRepository: IOrderRepository;
    pdfCreator: IPDFCreator;
    revenueRepository :IRevenueRepository
  };
  service: {
    paymentService: IPaymentService;
    cloudinaryService: ICloudinaryService;
  };
}

export class UserCourseService {
  private course;
  private paymentService;
  private OrderService;
  private pdfCreator;
  private cloudinaryService;
  private revenueRepository;

  constructor(dependency: Dependency) {
    this.course = dependency.Repository.courseRepository;
    this.paymentService = dependency.service.paymentService;
    this.OrderService = dependency.Repository.orderRepository;
    this.pdfCreator = dependency.Repository.pdfCreator;
    this.cloudinaryService = dependency.service.cloudinaryService;
    this.revenueRepository = dependency.Repository.revenueRepository
  }

  async getAllCourse() {
    const courses = await this.course.getAllCourse();
    return courses;
  }

  async payementPage(
    price: number,
    courseName: string,
    courseImage: string,
    userInfo: Iuser,
    course: ICourse
  ) {
    try {
      if (!userInfo || !userInfo._id) {
        throw AppError.conflict("User information or ID is missing");
      }

      const isbroughtalready = await this.OrderService.isOrderPlaced(
        userInfo!._id,
        course!._id as ObjectId
      );
      console.log(isbroughtalready , "isBrouht already")
      if (isbroughtalready) {
        throw AppError.conflict("course already Brought");
      }

      if (isbroughtalready) {
        return;
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
  async createOrder(order: IOrder): Promise<IOrder> {
    try {
      const orders = await this.OrderService.createOrder(order);
      const getFullDetails = await this.OrderService.findOrderById((orders as any)._id);
      const invoice = this.createInvoice(getFullDetails)
      const getInvoice = await this.generateInvoice(invoice);
      const secureUrl = await this.cloudinaryService.uploadPDF(getInvoice as unknown as any);
      console.log("secure url", secureUrl);
      getFullDetails.invoice = secureUrl;
      const updateOrder = await this.OrderService.updateOrder(getFullDetails);
      console.log(updateOrder, "updateOrder");
      const createRevenue = await this.createRevenue(getFullDetails)
  

      return updateOrder;
    } catch (error) {
      throw error;
    }
  }
  async paymentverify(userInfo: Iuser, sessionId: string) {
    try {
      const isPaymentSuccess = await this.paymentService.ispaymentverified(
        sessionId
      );
      if (isPaymentSuccess) {
        console.log("payment success");
        const updateOrder = await this.OrderService.orderPaymentUpdate(
          sessionId
        );
        return updateOrder;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async isorderCompleated(userId: ObjectId, courseId: ObjectId) {
    const isOrdeCompleated = await this.OrderService.isOrderPlaced(
      userId,
      courseId
    );
    return isOrdeCompleated;
  }
  async allUserOrder(userId: ObjectId) {
    try {
      const alluserOrder = await this.OrderService.allUserOrder(userId);
      return alluserOrder;
    } catch (error) {
      throw error;
    }
  }

  async createRevenue(orderDetals :IOrder){
    
    try {
      const adminRevenue = orderDetals.totalAmount*25/100;
      const tutorRevenue = orderDetals.totalAmount-adminRevenue

      const revenue :IRevenue = {
        tutorId:(orderDetals as any).courseId.tutorId,
        adminId:"admin",
        adminRevenue:adminRevenue,
        courseId:orderDetals.courseId,
        tutorRevenue:tutorRevenue,
      }
    
      const Revenue  = await this.revenueRepository.create(revenue)
      console.log(Revenue , "Revenueaved")
      return Revenue;
      
    } catch (error) {
      console.log(error)
      throw error
      
    }

  }

  createInvoice(getFullDetails:IOrder):IInvoiceData {
    try {

      const invoice: IInvoiceData = {
        customerEmail: (getFullDetails as any).userId.emailAddress,
        customerName: (getFullDetails as any).userId.firstName,
        date: new Date().toLocaleDateString("en-GB"),
        invoiceNumber: Math.floor(Math.random() * 1000).toString(),
        items: [
          {
            description: (getFullDetails as any).courseId.name as string,
            amount: getFullDetails.totalAmount,
          },
        ],
        total: getFullDetails.totalAmount,
      };
      return invoice

      
    } catch (error) {
      console.log(error)
      throw error;
      
    }
  }


  generateInvoice(InvoiceData: IInvoiceData) {
    try {
      const generatePdf = this.pdfCreator.generateInvoice(InvoiceData);
      console.log(generatePdf, "pdfGenerated");
      return generatePdf;
    } catch (error) {
      throw error;
    }
  }



}
