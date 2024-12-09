import Itutor from "../../../entitties/interfaces/tutor.ts/Itutor.ts";
import { ItutorRepository } from "../../../entitties/interfaces/tutor.ts/tutorrepository.ts";
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
    async findByEmail(email: string): Promise<Itutor | any> {
        try {
            const tutorDetail = await Tutor.findOne({emailAddress:email})
            return tutorDetail;
            
        } catch (error) {
            console.log(error)
            
        }
        
    }
    
}