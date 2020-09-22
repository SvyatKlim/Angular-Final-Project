import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Subject, Observable } from 'rxjs';
// import { IOrder } from '../interfaces/order.interface';
import { HttpClient } from '@angular/common/http';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IOrder } from '../interfaces/order.interface';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  basket: Subject<any> = new Subject<any>();
  constructor(private firecloud: AngularFirestore) {
  }

  addBasket(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.some(prod => prod.dataID === product.dataID)) {
        const index = localProducts.findIndex(prod => prod.dataID === product.dataID);
        localProducts[index].count = +localProducts[index].count + product.count;
      }
      else {
        localProducts.push(product);
      }
    }
    else {
      localProducts.push(product);
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
    this.basket.next('Хто щось добавив в кошик');
  }

  getFireCloudOrder(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('orders').snapshotChanges();
  }

  postFireCloudOrder(order: IOrder): Promise<DocumentReference> {
    return this.firecloud.collection('orders').add(order);
  }
}
