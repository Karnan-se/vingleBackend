
import TutorUseCase from "../../../usecases/tuotorService";
import TutorMongoRepository from "../../database/repositories/tutorRepository";
import { JwtService } from "../../web/utils/JwtService";
import { PasswordService } from "../../web/utils/passwordService";
import TutorController from "../../../adapters/controller/tutorController";


  const  repository ={
        tutorRepository : new TutorMongoRepository()
    }

const service ={
    JwtService : new JwtService(),
    passwordService: new PasswordService()
}

const tutorUseCase = new TutorUseCase({repository, service})

export const tutorController = new TutorController(tutorUseCase)
