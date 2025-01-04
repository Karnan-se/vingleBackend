import { ObjectId } from 'mongoose';

// Interface for Item
export interface IItem {
  _id?: ObjectId;
  title: string;
  type: 'video' | 'document'; 
  description?: string;
  fileUrl: string;
  duration?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ISection {
  _id?: ObjectId;
  title: string;
  items: ObjectId[] | IItem[]; 
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ICourse {
  _id?:ObjectId
  courseId: string;
  tutorId: ObjectId;
  name: string;
  thumbnail?: string;
  description: string;
  price: string | number;
  category: string;
  tags: string[];
  sections: ObjectId[] | ISection[]; 
  ratings: ObjectId[];
  comments: ObjectId[];
  isBlocked: boolean;
  users: string[];
  averageRating: number;
  totalRatings: number;
}









export interface InputSection {
  _id?: ObjectId;
  title: string;
  items: IItem[]; 
  createdAt?: Date;
  updatedAt?: Date;
}



export interface InputCourse {
  _id?:ObjectId
  courseId: string;
  tutorId: ObjectId;
  name: string;
  thumbnail?: string;
  description: string;
  price: string | number;
  category: string;
  tags: string[];
  sections: InputSection[]; 
  ratings: ObjectId[];
  comments: ObjectId[];
  isBlocked: boolean;
  users: string[];
  averageRating: number;
  totalRatings: number;

}

