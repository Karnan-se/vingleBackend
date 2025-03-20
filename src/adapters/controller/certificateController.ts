import { NextFunction , Request , Response} from "express";
import CertificateService from "../../usecases/CertificateService";
import AppError from "../../framework/web/utils/appError";
import { HttpStatus } from "../../entitties/Enums/statusCode";


export default class CertificateController {
    private certificateService
    constructor(certificateService :CertificateService){
        this.certificateService = certificateService

    }
    async getUserCertificate(req:Request , res:Response, next: NextFunction){
        try {
            console.log("reached here")
            const {userId} = req.query
            console.log(userId , "userId")
            if(!userId){
                throw AppError.conflict("userId is mising")
            }
            const certificate = await this.certificateService.getCertifcate(userId as string)
            if(certificate){
                res.status(HttpStatus.OK).json({certificate})
            }
            
            
        } catch (error) {
            console.log(error)
            throw error
            
        }

    }

}