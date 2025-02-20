import PDFDocument from "pdfkit"
import type { IInvoiceData } from "../../../entitties/interfaces/Invoice/Invoice"
import type { IPDFCreator } from "../../../entitties/interfaces/Invoice/IPDFcreator"
import { fileURLToPath } from "url";

import path from "path"

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

        // Resolve the absolute path of the image
        const imagePath = path.resolve(__dirname, "../../../entitties/Assets/vingle.png");

        // Add the image to the PDF
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
}

