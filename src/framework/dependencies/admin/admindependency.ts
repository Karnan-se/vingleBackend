import { AdminController } from "../../../adapters/controller/adminController.ts";
import  AdminUseCase  from "../../../usecases/adminService.ts";
import AdminRepository from "../../database/repositories/adminRepository.ts";
import { JwtService } from "../../web/utils/JwtService.ts";
import { PasswordService } from "../../web/utils/passwordService.ts";
import { MongoUserRepository } from "../../database/repositories/userRepository.ts";



const Repository ={
     adminRepository :  new AdminRepository(),
     userRespository : new MongoUserRepository()
}
const service ={
    passwordService : new PasswordService(),
    Jwtservice : new JwtService()
}


const adminUseCase = new AdminUseCase({Repository, service})

const adminController = new AdminController(adminUseCase)

export {adminController}