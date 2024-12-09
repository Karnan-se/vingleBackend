import TutorUseCase from "../../usecases/tuotorService.ts";
import TutorMongoRepository from "../database/repositories/tutorRepository.ts";
import { JwtService } from "../web/utils/JwtService.ts";
import { PasswordService } from "../web/utils/passwordService.ts";
import TutorController from "../../adapters/controller/tutorController.ts";




  const  repository ={
        tutorRepository : new TutorMongoRepository()
    }

const service ={
    JwtService : new JwtService(),
    passwordService: new PasswordService()
}

const tutorUseCase = new TutorUseCase({repository, service})

export const tutorController = new TutorController(tutorUseCase)
