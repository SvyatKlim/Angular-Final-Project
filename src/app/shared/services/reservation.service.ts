import { Injectable } from '@angular/core';
import { IReserv } from '../interfaces/reservation.interface';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firecloud: AngularFirestore, private toastr: ToastrService) { }
  getFireCloudReserv(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('reservation').snapshotChanges();
  }
  postFireCloudReserv(reservOrder: IReserv): Promise<DocumentReference> {
    return this.firecloud.collection('reservation').add(reservOrder);
  }
  updateFireCloudReserv(reservOrder: IReserv, newValue: string): Promise<void> {
    return this.firecloud
      .collection('reservation')
      .doc(reservOrder.dataID)
      .update({ progress: newValue });
  }
  deleteFireCloudReserv(id: string): Promise<void> {
    return this.firecloud.collection('reservation').doc(id).delete();
  }
  showSuccess(): any {
    this.toastr.success(`Thank you, booking is done !`);
  }
  showError(error: string): any {
    this.toastr.error(`Error: ${error}`);
  }
}
