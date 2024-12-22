
import InstructorRepository from "../../database/repositories/InstructorRepo.ts";
import InstructorService from "../../../usecases/InstructorService.ts";
import { CloudinaryService } from "../../web/utils/cloudinary.ts";
import { MongoUserRepository } from "../../database/repositories/userRepository.ts";
import TutorApplicationController from "../../../adapters/controller/tutorApplication.ts";


const repository  = {
    instructorRepository : new InstructorRepository(),
    userRepository : new MongoUserRepository()

}
const service ={
    cloudinaryService : new CloudinaryService()
}



const instructorService = new  InstructorService({repository, service})

export const tutorApplicationController = new TutorApplicationController({instructorService})