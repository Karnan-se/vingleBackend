import { IInstructor } from "../entitties/interfaces/tutor.ts/IInstructor";
import { IInstructorRepoInterface } from "../entitties/interfaces/tutor.ts/IInstructorRepo";

interface Dependency{
    InstructorRepo :IInstructorRepoInterface
}



export default class AdminApplicationService{
    constructor(dependency:Dependency){

    }
}