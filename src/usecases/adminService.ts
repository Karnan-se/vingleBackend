import { Iadmin } from "../entitties/interfaces/admin/Iadmin";
import { IadminRepository } from "../entitties/interfaces/admin/Iadminrepository";
import IpasswordService from "../entitties/interfaces/service.ts/passwordService";
import { IuserRepository } from "../entitties/interfaces/user/userrepository";
import AppError from "../framework/web/utils/appError";
import { JwtService } from "../framework/web/utils/JwtService";



interface Dependency {
    Repository :{
        adminRepository: IadminRepository,
        userRespository :IuserRepository
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
    private userRepository
    constructor(dependency:Dependency){
        this.adminRepository = dependency.Repository.adminRepository
        this.passwordService = dependency.service.passwordService
        this.jwtService = dependency.service.Jwtservice
        this.userRepository = dependency.Repository.userRespository

    }
    async signup(user:Iadmin){
        try {
            const existingadmin = await this.adminRepository.findByemail(user.emailAddress);
            if(existingadmin)throw AppError.conflict("User Already Exists");
            user.password = await this.passwordService.passwordHash(user.password)
            const adminDetails = await this.adminRepository.createAdmin(user);
            const accesToken = this.jwtService.generateAccesSToken(adminDetails._id , "Admin")
            const refreshToken = this.jwtService.generateRefreshToken(adminDetails._id , "Admin")
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
            const accessToken = this.jwtService.generateAccesSToken(exist._id , "Admin");
            const refreshToken = this.jwtService.generateRefreshToken(exist._id , "Admin")
            return {
                adminDetail : exist, 
                accessToken,
                refreshToken
            }

    }catch(error){
        throw error;
    }
}
 async getAllStudents(){
    try {
        const studentDetails = await this.userRepository.findAlluser();
        return studentDetails;
        
    } catch (error) {
        
    }
 }

}