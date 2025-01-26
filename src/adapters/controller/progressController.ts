import {Request , Response ,  NextFunction } from "express";
import ProgressServcie from "../../usecases/ProgressService";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";

export default class ProgressController {
    private ProgressService
    constructor(useCase:ProgressServcie){
        this.ProgressService = useCase
        
        
    }

    async isCourseProgressed(req:Request, res:Response, Next:NextFunction){
        let {userId, courseId, itemsId} = req.query || ""
        console.log(userId , courseId , itemsId)
        

       const Progress = await this.ProgressService.isCourseTracked(userId as unknown as ObjectId , courseId as unknown as ObjectId , itemsId as unknown as string[])
       if(Progress){
        console.log(Progress, "Progress")
        res.status(200).json({Progress})
       }else{
        res.status(200).json({message:"not tracked"})
       }

    }
    async createProgress(req:Request, res:Response, next: NextFunction){
        console.log("created")
        const {userId, courseId, itemsId} = req.body;
        console.log(itemsId ,  "itemsId ItemsId   ItemsId")
        const Progress = await this.ProgressService.createProgress(userId, courseId,itemsId )
        res.status(200).json({Progress})
    }

    async updateProgress(req:Request, res:Response, next:NextFunction){
        console.log("update Route ")
        try {
            const {userId, courseId, itemId, percentageCompleted} = req.body;
            // console.log( userId, courseId, itemId, percentageCompleted)

            const response = await this.ProgressService.updateProgress(userId, courseId, itemId, percentageCompleted)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
            
        }
       

    }
}