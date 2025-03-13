import CertificateService from "../../../usecases/CertificateService.ts";
import { CertificateRepository } from "../../database/repositories/certificateRepository.ts";
import CertificateController from "../../../adapters/controller/certificateController.ts";




const repository = {
    certificateRepository : new CertificateRepository()
}

const certificateService = new CertificateService({repository})
export const certificateController = new CertificateController(certificateService)
