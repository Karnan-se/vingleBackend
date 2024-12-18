import { Request, Response, NextFunction, json } from "express"

import InstructorService from "../../usecases/InstructorService"
import AppError from "../../framework/web/utils/appError"
interface useCase {
    instructorService : InstructorService
}




export default class TutorApplicationController {
    private instructorService 
    constructor(useCase : useCase){
        this.instructorService = useCase.instructorService

    }

    async TutorApplication(req:Request, res:Response, next:NextFunction){

        const files = req.files as { [key: string]: Express.Multer.File[] };
    try {

       
        const { headline, degree, qualification, experience , skills} = req.body;
        const parsedcertifications = req.body.certifications || "[]"
        console.log(parsedcertifications, "parsedCertificate")

      
// from body

        const resume = files?.["resume"]?.[0] || null;
        const certificationFiles = files?.certificateUrl || [];

// form files

        const certifications = parsedcertifications.map((cert:any, index:any) => ({
            ...cert,
            certificateUrl: certificationFiles[index] || null,
          }));

         

    
    
        const payload = {
            headline,
            degree,
            qualification,
            experience,
            skills:skills,
            resume,
            certifications
        }
        console.log(payload, "Payload is here");

        res.status(200).json({message:payload})


      
        
    } catch (error) {
        console.log(error)
        next(error)
    
    }

        
        
    }
}