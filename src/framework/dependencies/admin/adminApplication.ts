import AdminApplicationService from "../../../usecases/adminApplicationService";
import InstructorRepository from "../../database/repositories/InstructorRepo";
import { MongoUserRepository } from "../../database/repositories/userRepository";
import { EmailService } from "../../web/utils/emailService";

const repository ={
    userRepository : new MongoUserRepository(),
    InstructorRepo: new InstructorRepository(),

}
const service = {
    emailService : new EmailService(),
}
const adminapplicationService = new AdminApplicationService({repository, service})