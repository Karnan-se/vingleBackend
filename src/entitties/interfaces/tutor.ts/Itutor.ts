import { ObjectId } from "mongoose";

interface Itutor {
    emailAddress?: string;
    password?: string;
    firstName?: string;
    lastName? :string;
    country:string;
    isBlocked?:boolean
    isVerified?:boolean
    photo?: string;
    about?:string;
    phoneNumber?:string,
    applicationDetails?:ObjectId,  
}
export default Itutor