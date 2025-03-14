import { Schema } from "mongoose";
import Itutor from "./Itutor";
import { promises } from "dns";
import { ObjectId } from "mongoose";

interface ItutorRepository {
    createTutor(user:Itutor):Promise<Itutor | any >
    findByEmail(email:string | undefined):Promise<Itutor | any>
    UpdateUser(user:Itutor):Promise<Itutor | any>
    getAllTutors():Promise<Itutor[]>
    fetchTutorByEmail(emailAddress:string[]):Promise<Itutor[]>
    findById(tutorId:ObjectId):Promise<Itutor>
}

export {ItutorRepository}