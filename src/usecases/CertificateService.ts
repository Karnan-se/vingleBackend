import { ObjectId } from "mongoose"
import { ICertifiateRepository } from "../entitties/interfaces/certificate/ICertificateRepository"
import AppError from "../framework/web/utils/appError.ts"


interface Dependency {
    repository :{
        certificateRepository :ICertifiateRepository
    }
    
}


export  default class CertificateService {
    private certificateRepository
    constructor(dependency : Dependency){
        this.certificateRepository = dependency.repository.certificateRepository

    }
    async getCertifcate(userId:string){
        try {
            const certificate  = await this.certificateRepository.findUserCertificate(userId as unknown as  ObjectId)
            if(certificate){
                return certificate
            }
            
        } catch (error) {
            throw AppError.conflict("Error finding the cetificate ")
            
        }
        
  
        
    }
}