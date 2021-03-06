import { Injectable } from '@angular/core';
import { ICatCont } from '../interfaces/cat-contact.interface';
import { DocumentReference, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatContactService {

  constructor(private firecloud: AngularFirestore) { }
  postFireCloudCateringOrder(catOrder: ICatCont): Promise<DocumentReference> {
    return this.firecloud.collection('catering').add(catOrder);
  }
  getFireCloudCateringOrder(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('catering').snapshotChanges();
  }
  deleteFireCloudCateringOrder(id: string): Promise<void> {
    return this.firecloud.collection('catering').doc(id).delete();
  }

  // Contact Order
  postFireCloudContactOrder(contOrder: ICatCont): Promise<DocumentReference> {
    return this.firecloud.collection('contact').add(contOrder);
  }
  getFireCloudContactOrder(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('contact').snapshotChanges();
  }
  deleteFireCloudContactOrder(id: string): Promise<void> {
    return this.firecloud.collection('contact').doc(id).delete();
  }
}
