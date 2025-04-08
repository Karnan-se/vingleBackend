import { InstructorModel } from "../models/tutor/InstructorModel";

import { ObjectId } from "mongoose";
import AppError from "../../web/utils/appError";

import { IInstructorRepoInterface } from "../../../entitties/interfaces/tutor.ts/IInstructorRepo";
import { IInstructor } from "../../../entitties/interfaces/tutor.ts/IInstructor";
import { Tutor } from "../models/tutor/tutorModels";
import { userModel } from "../models/user/userModels";
import { Iuser } from "../../../entitties/interfaces/user/user";



export default class InstructorRepository implements IInstructorRepoInterface {
  async createUser(user: IInstructor): Promise<IInstructor | null> {
    console.log(user, "Received User Data");

    try {
      const createdTutor = await InstructorModel.create(user);
      console.log("User successfully created:", createdTutor);
      return createdTutor as IInstructor | any;
    } catch (error) {
      console.error("Error while creating user:", error);
      throw error;
    }
  }
  async findByUserId(userId: ObjectId | undefined): Promise<IInstructor> {
    try {
      console.log(userId, "userId preset in instructoer details ");
      const tutorDetail = await InstructorModel.findOne({ user_id: userId });
      console.log(tutorDetail);
      if (!tutorDetail) {
        throw AppError.conflict("no-application available");
      }
      return tutorDetail as unknown as IInstructor;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findById(_id: ObjectId | undefined): Promise<IInstructor> {
    try {
      const applicationDetails = await InstructorModel.findById({ _id });
      return applicationDetails as IInstructor;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async update(
    applicationDetail: IInstructor | undefined
  ): Promise<IInstructor> {
    try {
      const updatedApp = await InstructorModel.findOneAndUpdate(
        { _id: applicationDetail?._id },
        { $set: { ...applicationDetail } },
        { new: true }
      );
      return updatedApp as IInstructor;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findAll(skip: number, limit: number, search: string, filterChanged: string): Promise<Iuser[]> {
try {
    const studentDetails = await userModel.aggregate([
        {
          $match: {
            $and: [
              { isInstructor: { $ne: "Notapplied" } },
              ...(filterChanged ? [{ isInstructor: filterChanged }] : []),
              { isBlocked: false },
              { firstName: { $regex: search, $options: "i" } } 
            ]
          }
        }
      ]).skip(skip).limit(limit)

      const InstructorDetails = await InstructorModel.find()
      const applicationDetails = studentDetails.map((student)=> {
        const matching = InstructorDetails.find((instructor)=> String(instructor.user_id) === String(student._id))
       return {
        ...student , applicationDate : matching ? matching.createdAt : null
       }
      })
      const sorted = applicationDetails.sort((a, b)=> b["applicationDate"] - a["applicationDate"] )

      return sorted
      

    
} catch (error) {
    console.log(error)
    throw error
    
}
      
  }
}
