import { Schema } from "mongoose";
import Itutor from "./Itutor";

interface ItutorRepository {
    createTutor(user:Itutor):Promise<Itutor | any >
    findByEmail(email:string | undefined):Promise<Itutor | any>
}

export {ItutorRepository}