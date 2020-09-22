import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Array<any> = [];
  category: string;
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private firecloud: AngularFirestore
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.getFireCloudProducts(categoryName);
      }
    });
  }

  ngOnInit(): void {}

  private getFireCloudProducts(categoryName: string = 'deserts'): void {
    this.products = [];
    this.firecloud
      .collection('products')
      .ref.where('category', '==', categoryName)
      .onSnapshot((collection) => {
        collection.forEach((document) => {
          const data = document.data();
          const id = document.id;
          this.products.push({ id, ...data });
        });
        this.category = categoryName;
      });
  }
}
