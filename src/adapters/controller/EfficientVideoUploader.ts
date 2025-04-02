import { NextFunction , Request , Response } from "express";
import { EfficientVideoUploads } from "../../usecases/EfficientVideoUploader";
import AppError from "../../framework/web/utils/appError";
import { HttpStatus } from "../../entitties/Enums/statusCode";

export class VideoUploaderController {
    private VideoUploader

    constructor(videoUploader:EfficientVideoUploads){
        this.VideoUploader = videoUploader

    }
    async requestSignedUrl(req:Request, res:Response, next:NextFunction){
     try {
        const {fileType} = req.body;
        if(!fileType){
            throw AppError.conflict("No fileType Revcieved")
        }
        console.log(fileType , "recived")
        
        const signedUrl =await  this.VideoUploader.requestSignedUrl(fileType)
        console.log(signedUrl , "requestUrl")
        res.status(HttpStatus.OK).json({signedUrl})

        
     } catch (error) {
        console.log(error)
        next(error)
        
     }
    }

}