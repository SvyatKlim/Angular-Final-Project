import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string;
  constructor(private fireCloud: AngularFirestore) {}
  getFireCloudCategory(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('categories').snapshotChanges();
  }
  postFireCloudCategory(category: ICategory): Promise<DocumentReference> {
    return this.fireCloud.collection('categories').add(category);
  }
  deleteFireCloudCategory(id: string): Promise<void> {
    return this.fireCloud.collection('categories').doc(id).delete();
  }
}
