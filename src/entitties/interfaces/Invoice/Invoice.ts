export interface IInvoiceData {
    invoiceNumber:string,
    date:string,
    customerName:string,
    customerEmail:string,
    items:[
        {description: string, amount : number},
        {description:string , amount :number},
    ],
    total :number,

}