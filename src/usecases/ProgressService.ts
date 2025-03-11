import mongoose, { ObjectId } from "mongoose";
import IProgressRepository from "../entitties/interfaces/Progress/IprogressRepository.ts";
import { IProgress } from "../entitties/interfaces/Progress/IProgress.ts";
import AppError from "../framework/web/utils/appError.ts";
import { ICourse } from "../entitties/interfaces/course/course.ts";
import { ICourseRepository } from "../entitties/interfaces/course/IcouseRepository.ts";
import { ICertificate, ICertificateData } from "../entitties/interfaces/certificate/ICertificate.ts";
import { ICertifiateRepository } from "../entitties/interfaces/certificate/ICertificateRepository.ts";
import { configKeys } from "../config.ts";
import { IPDFCreator } from "../entitties/interfaces/Invoice/IPDFcreator.ts";
import { ICloudinaryService } from "../entitties/interfaces/service.ts/IcloudinaryService.ts";


interface Dependency {
  Repository: {
    progresRepository: IProgressRepository;
     courseRepository : ICourseRepository;
     certificateRepository : ICertifiateRepository
  },
  Service :{
    pdfGenerator : IPDFCreator
    cloudinaryService :ICloudinaryService
    
  }
}

export default class ProgressServcie {
  private Progress;
  private courseRepository;
  private certificateRepository
  private pdfGenerator
  private cloudinaryService

  constructor(dependency: Dependency) {
    this.Progress = dependency.Repository.progresRepository;
    this.courseRepository = dependency.Repository.courseRepository;
    this.certificateRepository = dependency.Repository.certificateRepository
    this.pdfGenerator = dependency.Service.pdfGenerator
    this.cloudinaryService = dependency.Service.cloudinaryService
  }
  async isCourseTracked(
    userId: ObjectId,
    courseId: ObjectId,
    itemsId: string[]
  ) {
    const trackCourse = await this.Progress.trackCourse(
      userId,
      courseId,
      itemsId
    );
    return trackCourse;
  }
  async createProgress(
    userId: ObjectId,
    courseId: ObjectId,
    itemsId: string[]
  ) {
    const progress = await this.Progress.createNewProgress(
      userId,
      courseId,
      itemsId
    );
    console.log(progress, "progress");
    return progress;
  }
  async updateProgress(
    userId: ObjectId,
    courseId: ObjectId,
    itemId: string,
    percentageCompleted: number
  ) {
    console.log("reached servie");
    const findProgress = await this.Progress.findCourseProgress(
      userId,
      courseId
    );

    if (!findProgress) {
      throw AppError.conflict("prrogres doesnot find");
    }
    if (!Array.isArray(findProgress.completedItems)) {
      findProgress.completedItems = [];
    }
    const objectItemId = new mongoose.Schema.Types.ObjectId(itemId);
    const item = findProgress.completedItems.find(
      (completed) => completed.itemId?.toString() == itemId.toString()
    );

    if (percentageCompleted > item!.percentageCompleted) {
      item!.percentageCompleted = percentageCompleted;
    }

    await findProgress.save();
    await this.totalProgressUpdate(findProgress);
    return findProgress;
  }
  async totalProgressUpdate(progress: IProgress) {
    console.log("updating total Percentage of the course");
    const totalSum = progress.completedItems.reduce(
      (acc, item) => acc + item.percentageCompleted,
      0
    );
    const totalitems = progress.completedItems.length;
    const averagePercentage = totalSum / totalitems;
    progress.progressPercentage = averagePercentage;
    const updateTotalPercentage = await this.Progress.updateProgress(progress);
    if ((updateTotalPercentage.progressPercentage as number) > 90) {
      this.createCertificate(updateTotalPercentage);
    }
  }
  async createCertificate(progress: IProgress) {
    console.log("certificate Created")

    const { courseId, userId } = progress;
    const courseDetails = await  this.courseRepository.getcourse(courseId);
    console.log(courseDetails , "courseDetails")
    const tutorId = (courseDetails as any).tutorId
    const certificate  : ICertificate = {
      courseId : courseId,
      tutorId:tutorId,
      userId:userId,
    }
    const findCertificate = await this.certificateRepository.findcertificateExist(courseId , tutorId , userId)
    if(findCertificate){
      console.log("certificate Already Exist")
      return findCertificate
    }
    const savedCertificate = await this.certificateRepository.create(certificate)
    const certificateDetails = await this.certificateRepository.findByIdandPopulate(savedCertificate._id as unknown as  string);
    
   
    const certificateData: ICertificateData = {
      date: certificateDetails.createdAt ? new Date(certificateDetails.createdAt).toLocaleDateString("en-GB")  : "", 
      vigleLogo: configKeys.VINGLE_LOGO || "", 
      tutorName: certificateDetails.tutorId?.firstName ?? "Unknown Tutor", 
      userName: certificateDetails.userId?.firstName ?? "Unknown User",
      courseName:certificateDetails.courseId.name ?? "",
      certificateBackground: configKeys.CERTIFICATE_TEMPLATE || "",
    };
    const generateCertificate = await this.pdfGenerator.generateCertificate(certificateData);
    console.log(generateCertificate , "generated Certificate")
    const secureUrl = await this.cloudinaryService.uploadPDF(generateCertificate as unknown as any)
    console.log(secureUrl , "secureURL")
    savedCertificate.certificateUrl = secureUrl;
  
  }

  async getProgress(userId: ObjectId, courseId: ObjectId) {
    try {
      const getProgress = await this.Progress.getProgress(userId, courseId);
      return getProgress;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
