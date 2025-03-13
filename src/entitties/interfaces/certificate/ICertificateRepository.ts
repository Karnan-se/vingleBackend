import { ICertificate } from "./ICertificate"
import { Schema } from "mongoose"
import { ICourse } from "../course/course"
import Itutor from "../tutor.ts/Itutor"
import { Iuser } from "../user/user"
import { ObjectId } from "mongoose"

export interface ICertifiateRepository {
    create(data: Partial<ICertificate>): Promise<ICertificate>
    findByIdandPopulate(id: string): Promise<ICertificate<Schema.Types.ObjectId, ICourse , Itutor,Iuser > >
    findcertificateExist(courseId:ObjectId, tutorId :ObjectId , userId:ObjectId):Promise<ICertificate>
    update(id: string, data: Partial<ICertificate>): Promise<ICertificate> 
    findUserCertificate(userId : ObjectId):Promise<ICertificate[]>
}