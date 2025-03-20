import CertificateService from "../../../usecases/CertificateService";
import { CertificateRepository } from "../../database/repositories/certificateRepository";
import CertificateController from "../../../adapters/controller/certificateController";




const repository = {
    certificateRepository : new CertificateRepository()
}

const certificateService = new CertificateService({repository})
export const certificateController = new CertificateController(certificateService)
