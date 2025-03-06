import { Request, Response, NextFunction, json } from "express"
import InstructorService from "../../usecases/InstructorService"
import mongoose, { ObjectId } from "mongoose"
import { HttpStatus } from "../../entitties/Enums/statusCode.ts"

interface useCase {
    instructorService : InstructorService,
    
}


export default class TutorApplicationController {
    private instructorService 
    constructor(useCase : useCase){
        this.instructorService = useCase.instructorService

    }

    async TutorApplication(req:Request, res:Response, next:NextFunction){

        const files = req.files as { [key: string]: Express.Multer.File[] };
    try {
       
     
        
       
        const { headline, degree, qualification, experience , skills , user_id} = req.body;
        const parsedcertifications = req.body.certifications || "[]"
        // console.log(parsedcertifications, "parsedCertificate")

      

        const resume = files?.["resume"]?.[0] || null;
        const certificationFiles = files?.certificateUrl || [];
        // console.log(resume, "resumeBUffer")

        let certifications = null
        if(parsedcertifications && parsedcertifications.length>0){
            certifications = parsedcertifications.map((cert:any, index:any) => ({
                ...cert,
                certificateUrl: certificationFiles[index] || null,
              }));

        }
       


        const payload = {
        
            headline,
            user_id,
            degree,
            qualification,
            experience,
            skills:skills,
            resume,
            certifications
        }
        // console.log(payload, "Payload is here");

        const savedInstructor = await this.instructorService.CreateApplication(payload)
        console.log(savedInstructor)



        res.status(HttpStatus.OK).json({message:savedInstructor})


      
        
    } catch (error) {
        console.log(error)
        next(error)
    
    }
 
    }

    
}