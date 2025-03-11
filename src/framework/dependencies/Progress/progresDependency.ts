import ProgressServcie from "../../../usecases/ProgressService.ts";
import ProgressRepository from "../../database/repositories/ProgressRepository.ts";
import ProgressController from "../../../adapters/controller/progressController.ts";
import CourseRepository from "../../database/repositories/CourseRepository.ts";
import { CertificateRepository } from "../../database/repositories/certificateRepository.ts";
import { PDFcreator } from "../../web/utils/pdfGenerator.ts";
import { CloudinaryService } from "../../web/utils/cloudinary.ts";

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