import { ObjectId } from "mongoose"

export interface  ICertificate <I = ObjectId , C = ObjectId , T = ObjectId , U = ObjectId>{
    _id? :I,
    courseId: C,
    tutorId:T,
    userId:U,
    certificateUrl?:string,
    createdAt?: Date; 
    updatedAt?: Date;
}


    export interface ICertificateData {
        date: string;
        vigleLogo: string;
        tutorName: string;
        userName: string;
        certificateBackground: string;
      }
