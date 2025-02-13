import { IRatings } from "./IRatings"


export interface IRatingRepository {
    updateRatings (ratings: IRatings):Promise<IRatings>
    createRatings (ratings:IRatings):Promise<IRatings> 

}