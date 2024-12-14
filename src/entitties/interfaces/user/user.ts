import {ObjectId} from "mongoose"

export interface Iuser{

    emailAddress: string ;
    password?: string;
    firstName?: string ;
    lastName? :string ;
    country:string ;
    isBlocked?:boolean 
    isVerfied?:boolean 
    photo?: string 
    phoneNumber?:string
    socialmedia?:{linkedin:string , twitter:string };

}


