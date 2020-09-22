import { Injectable } from '@angular/core';
import { IReserv } from '../interfaces/reservation.interface';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firecloud: AngularFirestore) { }
  getFireCloudReserv(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('reservation').snapshotChanges();
  }
  postFireCloudReserv(reservOrder: IReserv): Promise<DocumentReference> {
    return this.firecloud.collection('reservation').add(reservOrder);
  }
  updateFireCloudReserv(reservOrder: IReserv): Promise<void> {
    return this.firecloud
      .collection('reservation')
      .doc(reservOrder.dataID)
      .update(reservOrder);
  }
  deleteFireCloudReserv(id: string): Promise<void> {
    return this.firecloud.collection('reservation').doc(id).delete();
  }
}
