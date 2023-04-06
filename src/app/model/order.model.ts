import { Client } from './client.model';
import { Service } from './services.model';
export class Order {
  client: Client;

  deliveryDate: string;

  ordersDate: string;

  commentary: string;
invoiceNumber:string;
  ordersNumber: string;

  email: string;
  isFinished: string;

  amountPaid: number=0;

  pendingAmount: number;

  subTotal: number;

  discount: number;
  invoiceDate:string

  total: number;

  totalQty: number;

  detail: OrdersDetail[];
  payDetail:payDetail[]
}
export class payDetail{
   amount:number
   payType:string
}
export class OrdersDetail {
  quantity: number;

  service: Service;

  discount: number;

  total: number;
  price: number;
}
