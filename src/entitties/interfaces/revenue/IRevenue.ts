import mongoose, { Document } from "mongoose";
import { ObjectId } from "mongoose";
import { ICourse } from "../course/course";

export interface IRevenue<T=ObjectId , tutor= ObjectId , course = ObjectId>{
  _id?: T
  tutorId: tutor,
  adminId: String,
  courseId: course, 
  tutorRevenue: number;
  adminRevenue: number;
}
