import { UserCourseService } from "../../../usecases/userCourseService.ts";
import { UserCourseController } from "../../../adapters/controller/userCourseController.ts";
import { UserCourseRepository} from "../../database/repositories/userCourseRepository.ts"







const Repository ={
    courseRepository: new UserCourseRepository()

}
const userCourseService = new UserCourseService({Repository})

export const userCourseController = new UserCourseController({userCourseService})