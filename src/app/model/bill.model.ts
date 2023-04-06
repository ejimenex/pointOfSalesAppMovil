import { Provider } from "./providers";

export class Bill{
    date: string;
    provider: Provider;
 
    amount: number;
    pendingAmount: number;
    paidAmount: number;
    invoiceNumber: string;
    email: string;
    concept:string
    reason:string
    image:string;
}