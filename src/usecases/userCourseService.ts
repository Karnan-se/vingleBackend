import { IuserCourseRepository } from "../entitties/interfaces/course/IuserCourseRepository.ts";
import { IOrder } from "../entitties/interfaces/Iorder/Iorder.ts";
import { IOrderRepository } from "../entitties/interfaces/Iorder/IOrderRespository.ts";
import { IPaymentService } from "../entitties/interfaces/service.ts/IPaymentService.ts";
import { ObjectId } from "mongoose";
import { Iuser } from "../entitties/interfaces/user/user.ts";
import AppError from "../framework/web/utils/appError.ts";
import { ICourse } from "../entitties/interfaces/course/course.ts";
import { IInvoiceData } from "../entitties/interfaces/Invoice/Invoice.ts";
import { IPDFCreator } from "../entitties/interfaces/Invoice/IPDFcreator.ts";
import { ICloudinaryService } from "../entitties/interfaces/service.ts/IcloudinaryService.ts";
interface Dependency {
  Repository: {
    courseRepository: IuserCourseRepository;
    orderRepository: IOrderRepository;
    pdfCreator :IPDFCreator;

  };
  service: {
    paymentService: IPaymentService;
    cloudinaryService:ICloudinaryService,
  };
}

export class UserCourseService {
  private course;
  private paymentService;
  private OrderService;
  private pdfCreator;
  private cloudinaryService;

  constructor(dependency: Dependency) {
    this.course = dependency.Repository.courseRepository;
    this.paymentService = dependency.service.paymentService;
    this.OrderService = dependency.Repository.orderRepository;
    this.pdfCreator = dependency.Repository.pdfCreator;
    this.cloudinaryService = dependency.service.cloudinaryService
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
  async createOrder(order: IOrder):Promise<IOrder> {
    try {
    const orders = await this.OrderService.createOrder(order);
    const getFullDetails = await this.OrderService.findOrderById((orders as any)._id)
    const invoice :IInvoiceData = {
      customerEmail:(getFullDetails as any).userId.emailAddress,
      customerName:(getFullDetails as any ).userId.firstName,
      date: new Date().toLocaleDateString("en-GB"), 
      invoiceNumber:Math.floor((Math.random())*1000).toString(),
      items:[{description :((getFullDetails as any).courseId.name as string)  , amount : order.totalAmount} ],
      total:order.totalAmount 
    }
    console.log(invoice , "invoice")
    const getInvoice = await this.generateInvoice(invoice)
   const secureUrl=await this.cloudinaryService.uploadPDF(getInvoice as unknown as any)
   console.log("secure url" , secureUrl)
   getFullDetails.invoice = secureUrl
   const updateOrder = await this.OrderService.updateOrder(getFullDetails)
   console.log(updateOrder , "updateOrder")
    
    return orders;
    
      
    } catch (error) {
      throw error
      
    }
    
  }
  async paymentverify(userInfo: Iuser, sessionId: string ) {
    try {
      
      const isPaymentSuccess = await this.paymentService.ispaymentverified(
        sessionId
      );
      if (isPaymentSuccess) {
        console.log("payment success");
          const updateOrder = await this.OrderService.orderPaymentUpdate(sessionId);
          return updateOrder;
        
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async isorderCompleated(userId:ObjectId, courseId:ObjectId){
    const isOrdeCompleated = await this.OrderService.isOrderPlaced(userId, courseId)
    return isOrdeCompleated
  }
  async allUserOrder(userId:ObjectId){
    try {
      const alluserOrder = await this.OrderService.allUserOrder(userId);
      return alluserOrder
      
    } catch (error) {
      throw error
      
    }
  }

  generateInvoice(InvoiceData : IInvoiceData){
    try {
      const generatePdf =  this.pdfCreator.generateInvoice(InvoiceData)
      console.log(generatePdf , "pdfGenerated")
      return generatePdf
      
    } catch (error) {
      throw error
    }
   

  }
}
