import {
  ICourse,
  IItem,
  InputSection,
} from "../entitties/interfaces/course/course";
import { ICourseRepository } from "../entitties/interfaces/course/IcouseRepository";
import AppError from "../framework/web/utils/appError";
import { ObjectId } from "mongoose";
import fs from "fs";
import path from "path";
import { IFfmpegService } from "../entitties/interfaces/ffmpeg/IFfmpeg";
import { ICloudinaryService } from "../entitties/interfaces/service.ts/IcloudinaryService";

interface Dependency {
  Repository: {
    courseRepository: ICourseRepository;
  };
  Service: {
    cloudinaryService: ICloudinaryService;
    FfmpegService: IFfmpegService;
  };
}

export default class CourseService {
  private Course;
  private cloudinarySevice;
  private ffmpegService;
  constructor(dependency: Dependency) {
    this.Course = dependency.Repository.courseRepository;
    this.cloudinarySevice = dependency.Service.cloudinaryService;
    this.ffmpegService = dependency.Service.FfmpegService;
  }

  async CreateCourse(course :ICourse ) {
    try {
     
      const newCourse = await this.Course.createCourse(course);
      console.log(newCourse, "heello tjis is courseDetail");

      return newCourse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

 

  async getAllCourse() {
    try {
      const course = await this.Course.getAllCourseFromDataBase();
      return course;
    } catch (error) {
      throw AppError.conflict("Error getting the course Details");
    }
  }
  async updateSection( section: InputSection ) {
    try {

      const promises = section.items.map(async (item) => {
        
        if (!item._id) {
          console.log(item, "this is the Item going to save on the database");
          return await this.Course.createNewItem({
            ...section,
            items: [item],
          });
        } else {
          console.log(item, "this is updated by the way");
          return await this.Course.updateItem({
            ...section,
            items: [item],
          });
        }
      });
      console.log(section.title , "section.title" )

      const results = await Promise.all(promises);

      console.log(results, "result of the saved course from updating");
      console.log(results.length);
      const sectionId = section._id;
      const flatResult = results.flat();
      console.log(flatResult , "flatResult")

      await this.filteritems(sectionId, flatResult, section.title );

      return results;
    } catch (error) {
      console.error("Error in updateSection:", error);
      throw error;
    }
  }

  async getCourse(courseId: ObjectId) {
    try {
      const courseDetail = await this.Course.getcourse(courseId);

      return courseDetail;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async filteritems( section_id: ObjectId | undefined, result: ObjectId[] , sectionTitle:string
  ): Promise<void> {
    try {
      let objectID = result.flat(Infinity);

      console.log(objectID, "ObjectId");
      const filtered = await this.Course.filterItemsId(section_id, objectID , sectionTitle);
      console.log(filtered);
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async addNewSections(
    course_id: ObjectId,
    section: InputSection
  ) {
    try {
     
        console.log(section , "sectionn")
      const promises = await this.Course.createNewItem({ ...section });
      const itemIdsNested = await Promise.all(promises);
      const itemIds = itemIdsNested.flat();
      console.log(itemIds, "itemsIdss ItemIDs ........ItemsIds");
      const newSection = { ...section, items: itemIds };
      console.log(newSection);
      const createNewSection = await this.Course.addnewSection(newSection);
      console.log(createNewSection);
      const courseUpdate = await this.Course.courseUpdate(
        createNewSection._id,
        course_id
      );
      console.log(courseUpdate, "courseUpdate , courseUpdate , courseUpdate");
      return courseUpdate;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadandAppend(
    section: InputSection,
    fileUrlFile: Express.Multer.File[],
    fileIndex: number[]
  ) {
    if (fileUrlFile) {
      const uploadPromises = fileUrlFile.map(async (file, index) => {
        if (file.mimetype.startsWith("video/")) {
          console.log("Uploading video... please wait");
          const videoUrl = await this.cloudinarySevice.uploadCompressedVideo(
            file
          );
          console.log(videoUrl, "videoUrl uploaded");
          section.items[fileIndex[index]].fileUrl =
            videoUrl as unknown as string;
        } else {
          console.log("Uploading PDF... please wait");
          const pdfUrl = await this.cloudinarySevice.uploadPDF(file);
          console.log(pdfUrl, "pdfUrl uploaded");
          section.items[fileIndex[index]].fileUrl = pdfUrl as unknown as string;
        }
      });

      await Promise.all(uploadPromises);
    }
  }
  async tutorsCourse(tutorId: ObjectId) {
    try {
      const tutorCourse = await this.Course.tutorsCourse(tutorId);

      return tutorCourse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateCourse(courserId: ObjectId, course: ICourse): Promise<ICourse> {
    try {
      const updatedcourse = await this.Course.updateCourse(courserId, course);
      return updatedcourse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async compressVideoUsingFfmpeg(
    file: Express.Multer.File,
    output: string
  ): Promise<string> {
    try {
      if (!file.path) {
        throw new Error("path is incorrect");
      }
      const compressVideo = await this.ffmpegService.compressUsingFFmpeg(
        file.path,
        output
      );
      return compressVideo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async paginatedCourse(pageNumber:number , search:string , filterChange:string , tutorId : string){
    try {
      let limit = 5
      const skip = (pageNumber-1 )* limit;
      const {course , totalCourse} = await this.Course.paginatedCourse(skip ,limit , search , filterChange , tutorId as string)
      return {course , totalCourse}
    } catch (error) {
      throw error
      
    }

  }
}
