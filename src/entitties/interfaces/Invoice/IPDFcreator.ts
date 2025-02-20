import { IInvoiceData } from "./Invoice";

export interface IPDFCreator {
    generateInvoice(invoiceData: IInvoiceData):Promise<Buffer> ;
}
