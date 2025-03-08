import Itutor from "../../../entitties/interfaces/tutor.ts/Itutor.ts";
import { ItutorRepository } from "../../../entitties/interfaces/tutor.ts/tutorrepository.ts";
import AppError from "../../web/utils/appError.ts";
import { Tutor } from "../models/tutor/tutorModels.ts";

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
    
}