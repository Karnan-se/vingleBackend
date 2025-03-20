import AdminApplicationService from "../../../usecases/adminApplicationService";
import InstructorRepository from "../../database/repositories/InstructorRepo";
import { MongoUserRepository } from "../../database/repositories/userRepository";
import { EmailService } from "../../web/utils/emailService";
import AdminApplicationController from "../../../adapters/controller/adminApplicationcont";
import GenerateTutorPassword from "../../web/utils/gerneratCustompassword";
import TutorMongoRepository from "../../database/repositories/tutorRepository";
import { PasswordService } from "../../web/utils/passwordService";


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