import { IReserv } from '../interfaces/reservation.interface';
export class Reservation implements IReserv {
    constructor(
        public userID: string,
        public dataID: string,
        public name: string,
        public email: string,
        public date: string,
        public time: string,
        public people: string,
        public progress: string) {

    }
}