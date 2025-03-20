import { AdminController } from "../../../adapters/controller/adminController";
import  AdminUseCase  from "../../../usecases/adminService";
import AdminRepository from "../../database/repositories/adminRepository";
import { JwtService } from "../../web/utils/JwtService";
import { PasswordService } from "../../web/utils/passwordService";
import { MongoUserRepository } from "../../database/repositories/userRepository";



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