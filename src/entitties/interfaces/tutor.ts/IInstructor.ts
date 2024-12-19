import { Types } from "mongoose";

export interface IInstructor {
  _id?: Types.ObjectId;
  user_id?: Types.ObjectId | undefined;
  headline?: string;
  skills?: string[];
  degree?: string;
  qualification?: string;
  experience?: string;
  resume?: Express.Multer.File | any,
  certifications?: {
    title?: string;
    issuer?: string;
    date?: Date;
    certificateUrl?: Express.Multer.File | any;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
