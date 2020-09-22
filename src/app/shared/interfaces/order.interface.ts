import { IProduct } from './product.interface';
export interface IOrder {
    dataID: string;
    userFistName: string;
    userLastName: string;
    userPhone: string;
    userEmail: string;
    userCity: string,
    userAdress: string;
    userComment: string;
    userOrder: Array<IProduct>;
    payment: string;
    totalPayment: number;
    dateOrder: Date;
    statusOrder: string;
    userId: string;
}
