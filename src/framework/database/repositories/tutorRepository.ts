import { ObjectId } from "mongoose";

import AppError from "../../web/utils/appError";
import { Tutor } from "../models/tutor/tutorModels";
import Itutor from "../../../entitties/interfaces/tutor.ts/Itutor";
import { ItutorRepository } from "../../../entitties/interfaces/tutor.ts/tutorrepository";


export default class TutorMongoRepository implements ItutorRepository {

   async createTutor(user: Itutor): Promise<Itutor | any> {
        try {
            const tutorDetail = await Tutor.create(user);
            return tutorDetail
            
        } catch (error) {
            console.log(error)
            
        }
        
        
    }
    async findByEmail(email: string | any): Promise<Itutor | any> {
        try {
            const tutorDetail = await Tutor.findOne({emailAddress:email})
            return tutorDetail;
            
        } catch (error) {
            console.log(error)
            
        }
        
    }
    async UpdateUser(user:Itutor):Promise<Itutor | any>{
        try {
            let tutorDetails = await this.findByEmail(user.emailAddress);
            if(!tutorDetails){
                throw AppError.conflict("user Details not found")
               }
               Object.assign(tutorDetails, user);
               const saved =await tutorDetails.save()
               return saved;
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }
   async getAllTutors():Promise<Itutor[]> {
        try {
            const tutors = await Tutor.find()
            return tutors as unknown as Itutor[]

        } catch (error) {
            throw error
            
        }
        
    }
 async fetchTutorByEmail(emailAddress: string[]): Promise<Itutor[]> {
    try {
        
       console.log(emailAddress , "emailaddress is recieved at backEnd")
        const tutors = await Tutor.find({emailAddress: {$in:emailAddress}})
        return tutors as unknown as  Itutor[]
    } catch (error) {
        console.log(error)
        throw error
        
    }
     
 }
 async findById(tutorId: ObjectId): Promise<Itutor> {
    try {
        console.log(tutorId , "it is tutuor ID")
        const tutor = await Tutor.findOne({_id:tutorId})
        if(!tutor){
            console.log("no tutorPresent")
        }
        return tutor as unknown as Itutor
        
    } catch (error) {
        console.log(error)
        throw error;
        
    }
     
 }
    
}