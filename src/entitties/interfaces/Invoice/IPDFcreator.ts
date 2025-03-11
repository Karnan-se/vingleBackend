import { IInvoiceData } from "./Invoice";
import { ICertificateData } from "../certificate/ICertificate";

export interface IPDFCreator {
    generateInvoice(invoiceData: IInvoiceData):Promise<Buffer>
     generateCertificate(certificateData: ICertificateData): Promise<Buffer> 
}
