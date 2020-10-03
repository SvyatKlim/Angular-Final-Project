import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import AOS from 'aos';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  category: string;
  countNum: number
  constructor(
    private toastr: ToastrService,
    private ordersService: OrderService,
    private actRoute: ActivatedRoute,
    private firecloud: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getViewProduct();
    AOS.init()
  }

  private getViewProduct(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.firecloud
      .collection('products')
      .doc(id)
      .get()
      .subscribe((document) => {
        const data = document.data();
        const dataID = document.id;
        this.product = { dataID, ...data };
        this.countNum = data.count
      });
  }
  addToBasket(product: IProduct): void {
    this.product.count = this.countNum;
    this.ordersService.addBasket(product);
    this.showSuccess()
  }
  showSuccess(): any {
    this.toastr.success(`Product has been added!`);
  }
  getCount(counterNum: number): void {
    this.countNum = counterNum
  }
}
