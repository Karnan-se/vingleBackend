import PDFDocument from "pdfkit"
import type { IInvoiceData } from "../../../entitties/interfaces/Invoice/Invoice"
import type { IPDFCreator } from "../../../entitties/interfaces/Invoice/IPDFcreator"
import { fileURLToPath } from "url";

import path from "path"
import { ICertificateData } from "../../../entitties/interfaces/certificate/ICertificate";

export class PDFcreator implements IPDFCreator {
  constructor() {}

  generateInvoice(invoiceData: IInvoiceData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 })
        const buffers: Buffer[] = []

        doc.on("data", (chunk) => buffers.push(chunk))
        doc.on("end", () => resolve(Buffer.concat(buffers)))

    
        const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
          doc.moveTo(x1, y1).lineTo(x2, y2).stroke()
        }


        doc.font("Helvetica-Bold")

        doc.fontSize(24).text("INVOICE", { align: "center" })
        doc.moveDown()

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        
        const imagePath = path.resolve(__dirname, "../../../entitties/Assets/vingle.png");

        
        doc.image(imagePath, 50, 45, { width: 100 });


        doc.font("Helvetica").fontSize(10)
        doc.text("V Ingle", { align: "right" })
        doc.text("Ernakulam", { align: "right" })
        doc.text("Kerala, India 686513", { align: "right" })
        doc.text("Phone: (+91) 9048905001", { align: "right" })
        doc.moveDown()


        doc.font("Helvetica-Bold").fontSize(12)
        doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 50, 200)
        doc.text(`Date: ${invoiceData.date}`, 50, 215)
        doc.moveDown()

     
        doc.font("Helvetica").fontSize(11)
        doc.text("Bill To:", 50, 250)
        doc.font("Helvetica-Bold")
        doc.text(invoiceData.customerName, 50, 265)
        doc.font("Helvetica")
        doc.text(invoiceData.customerEmail, 50, 280)

        const invoiceTableTop = 350
        doc.font("Helvetica-Bold")
        doc.text("Item", 50, invoiceTableTop)
        doc.text("Description", 150, invoiceTableTop)
        doc.text("Amount", 400, invoiceTableTop, { width: 90, align: "right" })
        drawLine(50, invoiceTableTop + 15, 500, invoiceTableTop + 15)

       
        let position = invoiceTableTop + 30
        doc.font("Helvetica")
        invoiceData.items.forEach((item, index) => {
          doc.text(`${index + 1}`, 50, position)
          doc.text(item.description, 150, position)
          doc.text(`₹${item.amount}`, 400, position, { width: 90, align: "right" })
          position += 20
        })

       
        drawLine(50, position + 10, 500, position + 10)
        doc.font("Helvetica-Bold")
        doc.text("Total:", 350, position + 20)
        doc.text(`₹${invoiceData.total}`, 400, position + 20, { width: 90, align: "right" })

      
        doc.font("Helvetica").fontSize(10)
        const bottomPosition = doc.page.height - 50
        doc.text("Thank you for your business!", 50, bottomPosition, { align: "center" })
        

        doc.end()
      } catch (error) {
        console.error("Error generating invoice:", error)
        reject(error)
      }
    })
  }
   async  generateCertificate(certificateData: ICertificateData): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          layout: "landscape",
          size: "A4",
          margin: 50,
        });
  
        const buffers: Buffer[] = [];
        doc.on("data", (chunk: Buffer) => buffers.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
  
        
        const drawLine = (x1: number, y1: number, x2: number, y2: number): void => {
          doc.moveTo(x1, y1).lineTo(x2, y2).stroke();
        };
  
        
        if (certificateData.certificateBackground) {
          try {
            doc.image(certificateData.certificateBackground, 0, 0, {
              width: doc.page.width,
              height: doc.page.height,
            });
          } catch (error) {
            console.error("Error loading background image:", error);
          }
        }
  
 
        doc.font("Helvetica");
  
        
        doc.fontSize(36).fill("#333333").text("Certificate of Achievement", 0, 100, { align: "center" });
  
      
        doc.fontSize(16).fill("#666666").text("THE FOLLOWING AWARD IS GIVEN TO", 0, 160, { align: "center" });
  
      
        doc.fontSize(32).fill("#333333").text(certificateData.userName, 0, 220, { align: "center" });
  
      
        const lineY = 270;
        drawLine(doc.page.width / 2 - 150, lineY, doc.page.width / 2 + 150, lineY);
  
       
        doc
          .fontSize(16)
          .fill("#666666")
          .text(
            `${certificateData.userName} has successfully completed the course on ${certificateData.date}.`,
            0,
            300,
            { align: "center" }
          );
  
        
        if (certificateData.vigleLogo) {
          try {
            const logoX = doc.page.width / 2 - 40;
            const logoY = 380;
            doc.image(certificateData.vigleLogo, logoX, logoY, { width: 80 });
          } catch (error) {
            console.error("Error loading logo:", error);
  
           
            const centerX = doc.page.width / 2;
            const centerY = 420;
            doc.circle(centerX, centerY, 40).fillAndStroke("#444444", "#000000");
          }
        }
  
   
        const signatureY = 500;
  
      
        doc.fontSize(14).text("Provider", doc.page.width / 4, signatureY, { align: "center" });
        drawLine(doc.page.width / 4 - 100, signatureY - 30, doc.page.width / 4 + 100, signatureY - 30);
  
        
        doc.fontSize(14).text(`Tutor: ${certificateData.tutorName}`, (doc.page.width * 3) / 4, signatureY, { align: "center" });
        drawLine((doc.page.width * 3) / 4 - 100, signatureY - 30, (doc.page.width * 3) / 4 + 100, signatureY - 30);
  
       
        doc.fontSize(10).text(
          "This certificate is awarded in recognition of the successful completion of the course.",
          0,
          550,
          { align: "center" }
        );
  
        
        doc.end();
      } catch (error) {
        console.error("Error generating certificate:", error);
        reject(error);
      }
    });
  }
}

