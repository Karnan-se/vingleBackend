
import InstructorRepository from "../../database/repositories/InstructorRepo";
import InstructorService from "../../../usecases/InstructorService";
import { CloudinaryService } from "../../web/utils/cloudinary";
import { MongoUserRepository } from "../../database/repositories/userRepository";
import TutorApplicationController from "../../../adapters/controller/tutorApplication";


const repository  = {
    instructorRepository : new InstructorRepository(),
    userRepository : new MongoUserRepository()

}
const service ={
    cloudinaryService : new CloudinaryService()
}



const instructorService = new  InstructorService({repository, service})

export const tutorApplicationController = new TutorApplicationController({instructorService})