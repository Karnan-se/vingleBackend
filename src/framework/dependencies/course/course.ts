import CourseService from "../../../usecases/CourseService.ts";
import CourseRepository from "../../database/repositories/CourseRepository.ts";
import CourseController from "../../../adapters/controller/courseController.ts";
import { CloudinaryService } from "../../web/utils/cloudinary.ts";




const Repository = {
    courseRepository: new CourseRepository()

}
const Service = {
    cloudinaryService :new CloudinaryService()
}

const courseService = new CourseService({Repository, Service});

const courseController = new CourseController({course: courseService})

export {courseController}