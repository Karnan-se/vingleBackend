import {ObjectId} from "mongoose"

export interface Iuser{

    emailAddress?: string;
    password?: string;
    firstName?: string;
    lastName? :string;
    country:string;
    isBlocked?:boolean
    photo?: string;
    socialmedia?:{linkedIN:string, twitter:string};

}