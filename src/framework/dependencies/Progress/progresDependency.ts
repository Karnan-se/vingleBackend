import ProgressServcie from "../../../usecases/ProgressService";
import ProgressRepository from "../../database/repositories/ProgressRepository";
import ProgressController from "../../../adapters/controller/progressController";
import CourseRepository from "../../database/repositories/CourseRepository";
import { CertificateRepository } from "../../database/repositories/certificateRepository";
import { PDFcreator } from "../../web/utils/pdfGenerator";
import { CloudinaryService } from "../../web/utils/cloudinary";

const Repository ={
    progresRepository : new ProgressRepository(),
    courseRepository : new CourseRepository(),
    certificateRepository : new CertificateRepository()
}
const Service ={
    pdfGenerator : new PDFcreator(),
    cloudinaryService : new CloudinaryService()
    
}



const progressService = new ProgressServcie({Repository , Service})

export const progresssController = new ProgressController(progressService)