import mongoose from "mongoose";


export interface IRatings {
    userId: mongoose.Types.ObjectId | string; 
    courseId: mongoose.Types.ObjectId |string;
    ratings: number | string; 
    review?: mongoose.Types.ObjectId |string;
  }
  