import mongoose, { ObjectId } from "mongoose";
import AppError from "../../framework/web/utils/appError.ts";
import AdminApplicationService from "../../usecases/adminApplicationService.ts";
import { Request, Response, NextFunction } from "express";
import { IInstructor } from "../../entitties/interfaces/tutor.ts/IInstructor.ts";
import { ErrorTypes } from "../../entitties/Enums/errorTypes.ts";
import { HttpStatus } from "../../entitties/Enums/statusCode.ts";


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
    

}