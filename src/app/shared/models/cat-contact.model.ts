import { ICatCont } from '../interfaces/cat-contact.interface';

export class CateringContact implements ICatCont {
    constructor(
        public dataID: string,
        public user_name: string,
        public user_email: string,
        public user_message: string,
        public user_phone?: string,
        public statusOrder: string = 'In processsing'
    ) { }
}
