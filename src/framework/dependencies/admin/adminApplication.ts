import AdminApplicationService from "../../../usecases/adminApplicationService.ts";
import InstructorRepository from "../../database/repositories/InstructorRepo.ts";
import { MongoUserRepository } from "../../database/repositories/userRepository.ts";
import { EmailService } from "../../web/utils/emailService.ts";
import AdminApplicationController from "../../../adapters/controller/adminApplicationcont.ts";
import GenerateTutorPassword from "../../web/utils/gerneratCustompassword.ts";
import TutorMongoRepository from "../../database/repositories/tutorRepository.ts";
import { PasswordService } from "../../web/utils/passwordService.ts";


const repository ={
    InstructorRepo: new InstructorRepository(),
    userRepository : new MongoUserRepository(),
    tutorRepository: new TutorMongoRepository(),
    
   

}
const service = {
    emailService : new EmailService(),
    generatePassword: new GenerateTutorPassword(),
    passwordService : new PasswordService()
}
const adminApplicationService = new AdminApplicationService({repository, service})
const adminApplicationController = new AdminApplicationController({adminApplicationService})
export {adminApplicationController}