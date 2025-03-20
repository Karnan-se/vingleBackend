import mongoose, { ObjectId } from "mongoose";
import AppError from "../../framework/web/utils/appError";
import AdminApplicationService from "../../usecases/adminApplicationService";
import { Request, Response, NextFunction } from "express";
import { ErrorTypes } from "../../entitties/Enums/errorTypes";
import { HttpStatus } from "../../entitties/Enums/statusCode";


interface UseCase{
    adminApplicationService:AdminApplicationService

}



export default  class AdminApplicationController{
    private applicationService
    
    constructor(usecase:UseCase){
        this.applicationService = usecase.adminApplicationService
    }
    async viewApplicationDetails(req:Request, res:Response, next:NextFunction){
        try {
            const {_id} = req.body;
            const objId = new mongoose.Types.ObjectId(_id) 
            
            if(!_id){
                throw AppError.conflict(ErrorTypes.INVALID_ID)
            }
            const applicationDetails = await this.applicationService.viewApplication(objId as unknown as  ObjectId)
            res.status(HttpStatus.OK).json({applicationDetails})
            
        } catch (error) {
            console.log(error);
            throw error
            
        }
   
    }
    async approveApplication(req:Request, res:Response, next:NextFunction){
        try {
            const {application } = req.body
            console.log(application)
            const approve = await this.applicationService.approveApplication(application._id , application.user_id)
            console.log(approve)
            res.status(HttpStatus.OK).json({approve})
            
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }
    async rejectApplication(req:Request, res:Response, next:NextFunction){
        try {
            const {application, rejectionReasons} = req.body
            console.log(application)
            console.log(rejectionReasons, "Rejection Reasons")
            const reject = await this.applicationService.rejectApplication(application._id, application.user_id, rejectionReasons)
            console.log(reject);
            res.status(HttpStatus.OK).json({reject})
            
        } catch (error) {
            
        }
    }

    async courseRejection(req:Request, res:Response, next:NextFunction){
        try {
            const {rejectionReasons , tutorId} = req.body
            console.log(rejectionReasons , "reaasoine")
          
            if(!rejectionReasons || !tutorId){
                return res.status(HttpStatus.NO_CONTENT)
            }
            const rejection = await this.applicationService.rejectCourse(rejectionReasons , tutorId)
            res.status(HttpStatus.OK).json({rejection})
            
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }
    

}