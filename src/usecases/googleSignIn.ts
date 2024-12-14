import { configKeys } from "../config.ts";
import { IGoogleService } from "../entitties/interfaces/service.ts/googleService.ts";
import { IuserRepository } from "../entitties/interfaces/user/userrepository.ts";
import AppError from "../framework/web/utils/appError.ts";



interface Dependencies {
    repository :{
        userRepository : IuserRepository
    },
    service :{
        googleService : IGoogleService,

    }
    
}

export default class GoogleSignService{
    private userRepository :IuserRepository
    private googleSignIn :IGoogleService
   

    constructor(dependency:Dependencies){
        this.userRepository = dependency.repository.userRepository
        this.googleSignIn = dependency.service.googleService
    }

    async GoogleSignIn(token:string){
        try {
            const profileDetail = await this.googleSignIn.tokenVerify(token)
            
            return profileDetail;
            
        } catch (error) {
            console.log(error);
            throw AppError.authentication("Authentication Failed")
        }
    }

    

}