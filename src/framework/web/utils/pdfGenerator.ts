import PDFDocument from "pdfkit"
import fs from  "fs"
import path, { dirname } from "path";
import { IInvoiceData } from "../../../entitties/interfaces/Invoice/Invoice";
import { IPDFCreator } from "../../../entitties/interfaces/Invoice/PDFcreator";

export class PDFcreator implements IPDFCreator {
    constructor(){
    }

    generateInvoice(invoiceData: IInvoiceData):void {
        const doc = new PDFDocument();
        const invoicePath  = path.join(__dirname, "../invoices", `invoice_${invoiceData.invoiceNumber}`)
        doc.pipe(fs.createWriteStream(invoicePath));

        doc.fontSize(18).text("Invoice" ,  {align:"center"}).moveDown();
        doc.fontSize(12).text(`Invoice Number : ${invoiceData.invoiceNumber}`)
        doc.text(`Date : ${invoiceData.date}`)
        doc.text(`Customer Name : ${invoiceData.customerName}`)
        doc.text(`Customer Email :${invoiceData.customerEmail}`).moveDown();

        doc.fontSize(14).text("Invoice Details" , {underline: true}).moveDown();
        invoiceData.items.forEach((item , index)=>{
            doc.text(`${index+1} . ${item.description} - ${item.amount}` )
        })

        doc.moveDown().font("Helvetica-Bold").fontSize(14).text(`Total Amount: ₹${invoiceData.total}`);
        doc.moveDown().fontSize(10).text("Thank you for your business!", { align: "center" });

        doc.end();
        console.log(`Invoice saved as ${invoicePath}`);
    }
} 