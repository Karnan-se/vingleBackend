import { ObjectId, Schema } from "mongoose";
import { ICertificate } from "../../../entitties/interfaces/certificate/ICertificate";
import { BaseRepository } from "./Base/BaseRepository";
import { certificateModal } from "../models/certificate/certificateModal";
import { ICertifiateRepository } from "../../../entitties/interfaces/certificate/ICertificateRepository";
import { ICourse } from "../../../entitties/interfaces/course/course";
import { Iuser } from "../../../entitties/interfaces/user/user";
import Itutor from "../../../entitties/interfaces/tutor.ts/Itutor";


export class CertificateRepository extends BaseRepository<ICertificate> implements ICertifiateRepository {
    constructor() {
        super(certificateModal)

    }
    async create(data: Partial<ICertificate>): Promise<ICertificate> {
        try {
            return (await this.model.create(data)) as ICertificate
            
        } catch (error) {
            console.log(error)
            throw error
        }
        
    }

   async  findByIdandPopulate(id: string): Promise<ICertificate<Schema.Types.ObjectId, ICourse , Itutor,Iuser > >{
        try {
            const certificate = await certificateModal.findOne({_id:id}).populate([
                {path:"tutorId"}, {path:"courseId"},{path:"userId"}
            ])
            return certificate as unknown as ICertificate<Schema.Types.ObjectId , ICourse , Itutor , Iuser>
        } catch (error) {
            console.log(error)
            throw error
            
        }
        
    }

   async  findcertificateExist(courseId: ObjectId, tutorId: ObjectId, userId: ObjectId): Promise<ICertificate> {
    try {
        const iscertificateExist = await certificateModal.findOne({courseId , tutorId , userId})
        return iscertificateExist as unknown as ICertificate
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
        
    }
    async update(id: string, data: Partial<ICertificate>): Promise<ICertificate> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true }).exec() as unknown as ICertificate
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
        
    }
    async findUserCertificate(userId : ObjectId):Promise<ICertificate[]>{
        try {
            const certificate = await certificateModal.find({userId}).populate([{path : "courseId"}])
            console.log(certificate , "certificate")
            return certificate as unknown as ICertificate[]
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }

        
    }

    
