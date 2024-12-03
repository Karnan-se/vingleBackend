import { Iadmin } from "../entitties/interfaces/admin/Iadmin.ts";
import { IadminRepository } from "../entitties/interfaces/admin/Iadminrepository.ts";
import IpasswordService from "../entitties/interfaces/service.ts/passwordService.ts";
import AppError from "../framework/web/utils/appError.ts";
import { JwtService } from "../framework/web/utils/JwtService.ts";



interface Dependency {
    Repository :{
        adminRepository: IadminRepository
    },
    service :{
        passwordService: IpasswordService,
        Jwtservice: JwtService
    }
   
    
}
export  default class adminUseCase {
    private adminRepository
    private passwordService
    private jwtService
    constructor(dependency:Dependency){
        this.adminRepository = dependency.Repository.adminRepository
        this.passwordService = dependency.service.passwordService
        this.jwtService = dependency.service.Jwtservice

    }
    async signup(user:Iadmin){
        try {
            const existingadmin = await this.adminRepository.findByemail(user.emailAddress);
            if(existingadmin)throw AppError.conflict("User Already Exists");
            user.password = await this.passwordService.passwordHash(user.password)
            const adminDetails = await this.adminRepository.createAdmin(user);
            const accesToken = this.jwtService.generateAccesSToken(adminDetails._id)
            const refreshToken = this.jwtService.generateRefreshToken(adminDetails._id)
            return {
                adminDetails, 
                accesToken, 
                refreshToken,
            }
            
        } catch (error) {
            throw error  
        }
       
    }
    async signIn(email:string, password:string){
        try{

        
        const exist = await this.adminRepository.findByemail(email);
        if(!exist) throw AppError.conflict("Email_id not registered");
        const isMatching = this.passwordService.comparepassword(password,exist.password )
        if(!isMatching) throw AppError.conflict("Incorrect Password")
            const accessToken = this.jwtService.generateAccesSToken(exist._id);
            const refreshToken = this.jwtService.generateRefreshToken(exist._id)
            return {
                adminDetail : exist, 
                accessToken,
                refreshToken
            }

    }catch(error){
        throw error;
    }
}

}