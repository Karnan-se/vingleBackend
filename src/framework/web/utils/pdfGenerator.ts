import PDFDocument from "pdfkit"
import type { IInvoiceData } from "../../../entitties/interfaces/Invoice/Invoice"
import type { IPDFCreator } from "../../../entitties/interfaces/Invoice/IPDFcreator"
import { fileURLToPath } from "url";
import sharp from "sharp";

import path from "path"
import { ICertificateData } from "../../../entitties/interfaces/certificate/ICertificate";
import AppError from "./appError.ts";

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
  async generateCertificate(certificateData: ICertificateData): Promise<Buffer> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const vingleLogo = path.resolve(__dirname, "../../../entitties/Assets/vingle.png");
    const backgroundImage = path.resolve(__dirname, "../../../entitties/Assets/certificateTemplate.png");
  
    return new Promise<Buffer>((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          layout: "landscape",
          size: "A4",
          margin: 40,
        });
  
        const buffers: Buffer[] = [];
        doc.on("data", (chunk: Buffer) => buffers.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
  
        const drawLine = (x1: number, y1: number, x2: number, y2: number): void => {
          doc.moveTo(x1, y1).lineTo(x2, y2).stroke("#666666");
        };
  
        if (backgroundImage) {
          try {
            doc.image(backgroundImage, 0, 0, {
              width: doc.page.width,
              height: doc.page.height,
            });
          } catch (error) {
            console.error("Error loading background image:", error);
          }
        }
  
        // Title - using Times-Roman for serif font
        doc.font("Times-Roman")
           .fontSize(42)
           .fill("#333333")
           .text("Certificate of Achievement", 0, 100, { align: "center" });
  
        // Subtitle
        doc.font("Helvetica")
           .fontSize(14)
           .fill("#666666")
           .text("THE FOLLOWING AWARD IS GIVEN TO", 0, 180, { align: "center" });
  
        // User name
        doc.font("Times-Roman")
           .fontSize(36)
           .fill("#333333")
           .text(certificateData.userName, 0, 240, { align: "center" });
  
        // Completion text
        doc.font("Times-Roman")
           .fontSize(14)
           .fill("#666666")
           .text(
             `${certificateData.userName} has successfully completed the ${certificateData.courseName} course on ${certificateData.date}.`,
             0,
             320,
             { align: "center" }
           );
  
        // Logo/Seal
        if (vingleLogo) {
          try {
            const logoX = doc.page.width / 2 - 40;
            const logoY = 400;
            doc.image(vingleLogo, logoX, logoY, { width: 80 });
          } catch (error) {
            console.error("Error loading logo:", error);
            const centerX = doc.page.width / 2;
            const centerY = 420;
            doc.circle(centerX, centerY, 40).fillAndStroke("#444444", "#000000");
          }
        }
  
        // Signature section - positioned lower and more spread out
        const signatureY = 520;
        const leftX = 150; // More to the left
        const rightX = doc.page.width - 150; // More to the right
        
        // Provider signature on the left
        drawLine(leftX - 100, signatureY, leftX + 100, signatureY);
        doc.font("Times-Roman")
           .fontSize(12)
           .text("Provider", leftX - 100, signatureY + 10, { 
             width: 200, 
             align: "center" 
           });
  
        // Tutor signature on the right
        drawLine(rightX - 100, signatureY, rightX + 100, signatureY);
        doc.font("Times-Roman")
           .fontSize(12)
           .text("Tutor", rightX - 100, signatureY + 10, { 
             width: 200, 
             align: "center" 
           });
  
        // Footer text - positioned higher to avoid page overflow
        doc.font("Times-Roman")
           .fontSize(10)
           .fill("#666666")
           .text(
             "This certificate is awarded in recognition of the successful completion of the course.",
             0,
             signatureY + 50,
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

