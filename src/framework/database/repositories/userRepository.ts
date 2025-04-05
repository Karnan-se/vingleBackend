import { userModel } from "../models/user/userModels"; //this part is from mongo modal
import { IuserRepository } from "../../../entitties/interfaces/user/userrepository";
import { Iuser } from "../../../entitties/interfaces/user/user";
import AppError from "../../web/utils/appError";
import { ObjectId } from "mongoose";
import { OrderModal } from "../models/course/OrderModal";


export class MongoUserRepository implements IuserRepository {
  async createUser(user: any): Promise<Iuser> {
    console.log(user, "Received User Data");

    try {
      const createdUser = await userModel.create(user);
      console.log("User successfully created:", createdUser);
      return createdUser as unknown as Iuser;
    } catch (error) {
      console.error("Error while creating user:", error);
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const userDetail = await userModel.findOne({ emailAddress: email });
      return userDetail as any;
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async UpdateUser(user: Iuser) {
    try {
      let userDetails = await this.findUserByEmail(user.emailAddress);
      if (!userDetails) {
        throw AppError.conflict("user Details not found");
      }
      Object.assign(userDetails, user);
      const saved = await userDetails.save();
      return saved as unknown as Iuser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findUserById(userId: string | ObjectId) {
    try {
      let userDetails = await userModel.findOne({ _id: userId });
      if (!userDetails) {
        throw AppError.conflict("user Details not Found");
      }
      return userDetails as unknown as Iuser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findAlluser() {
    try {
      let userDetails = await userModel
        .find({}, { password: 0 })
        .sort({ _id: -1 });
      // console.log(userDetails)
      if (!userDetails) {
        throw AppError.conflict("no users");
      }
      return userDetails as unknown as Iuser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findPaginatedUsers(skip: number, limit: number , search:string , filterchange : string):Promise<{students:Iuser[] , totalStudents: number}> {
    try {

        let filter :any = {}
        if (search) {
            filter.$or = [
              { firstName: { $regex: search, $options: "i" } },
              { emailAddress: { $regex: search, $options: "i" } },
            ];
          }
          if(filterchange) {
          if (filterchange === "true") {
            filter.isBlocked = true;
          } else if (filterchange === "false") {
            filter.isBlocked = false;
          }
        }

      const students = await userModel.find(filter ,{password: 0}).sort({_id: -1}).skip(skip).limit(limit).lean() as unknown as Iuser[];
      const totalStudents = await userModel.countDocuments(filter);
      
      for(let student of students) {
        const completedOrders = await OrderModal.find({
          userId: student._id, 
          paymentStatus: "Completed" 
        }).populate("courseId", "name").lean() as any[];
        
        const purchasedCourse = completedOrders
          .map(order => order.courseId?.name)
          .filter(Boolean);
          
        (student as any).purchasedCourse = purchasedCourse.length ? purchasedCourse : [];
      }
      console.log(students , "students")
      
      return {
        students,
        totalStudents
      };
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
