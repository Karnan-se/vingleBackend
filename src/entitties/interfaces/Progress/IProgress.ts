import { Document, Schema } from "mongoose";

export interface IProgress extends Document {
  userId: Schema.Types.ObjectId; 
  courseId: Schema.Types.ObjectId; 
  completedItems: {
    itemId: Schema.Types.ObjectId;
    percentageCompleted: number;
  }[]; 
  progressPercentage?: number; 
  lastAccessed?: Date; 
  createdAt?: Date; 
  updatedAt?: Date; 
}
