import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';
export class Order implements IOrder {
    constructor(
        public dataID: string,
        public userFistName: string,
        public userLastName: string,
        public userPhone: string,
        public userEmail: string,
        public userCity: string,
        public userAdress: string,
        public userComment: string = '',
        public userOrder: Array<IProduct>,
        public payment: string,
        public totalPayment: number,
        public dateOrder: Date,
        public statusOrder: string = 'in processing',
        public userId: string,
    ) { }
}