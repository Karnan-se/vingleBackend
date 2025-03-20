import CourseService from "../../../usecases/CourseService";
import CourseRepository from "../../database/repositories/CourseRepository";
import CourseController from "../../../adapters/controller/courseController";
import { CloudinaryService } from "../../web/utils/cloudinary";
import { FfmpegService } from "../../web/utils/ffmpeg";



const Repository = {
    courseRepository: new CourseRepository()

}
const Service = {
    cloudinaryService :new CloudinaryService(),
    FfmpegService : new FfmpegService()

}

const courseService = new CourseService({Repository, Service});

const courseController = new CourseController({course: courseService})

export {courseController}
