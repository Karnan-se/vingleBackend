import { userModel } from "../../database/models/user/userModels";
import { ObjectId } from "mongoose";


export const isBlocked = async(userId:ObjectId) => {
    const user = await userModel.findById({_id:userId}).select("isBlocked").lean();
    if (!user) {
        throw new Error("User not found");
    }       
    if (user.isBlocked) {
        return true;
    }
    return false;    
}