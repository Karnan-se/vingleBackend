import {OAuth2Client} from  "google-auth-library";
import { configKeys } from "../../../config";
import { IGoogleService } from "../../../entitties/interfaces/service.ts/googleService";


export default class googleService implements IGoogleService{
    constructor(){

    }
    async tokenVerify(token:string){
        const client  = new OAuth2Client(configKeys.GOOGLE_CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken:token,
                audience:configKeys.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload();
            console.log("GOOGLE TokenVerify", payload )
            return payload;
        }catch(error){
            console.log(error)
            throw error;
        }
    }
}