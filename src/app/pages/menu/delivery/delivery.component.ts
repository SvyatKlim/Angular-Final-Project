import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { ProductService } from '../../../shared/services/product.service';
import { IProduct } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  categories: Array<ICategory>;
  constructor(private catService: CategoryService,
    private prodService: ProductService) { }
  searchedKeyword: string;
  products: Array<IProduct>;
  btnActive: boolean = false;
  btnCatActive: string;
  search: boolean = false;
  searchInput: string = '';
  ngOnInit(): void {
    this.getFireCloudCategories();
    this.getFireCloudProducts()
  }
  private getFireCloudCategories(): void {
    this.catService.getFireCloudCategory().subscribe((collection) => {
      this.categories = collection.map((document) => {
        const data = document.payload.doc.data() as ICategory;
        const id = document.payload.doc.id;
        return { id, ...data };
      });
    });
  }
  private getFireCloudProducts(): void {
    this.prodService.getFireCloudProduct().subscribe((collection) => {
      this.products = collection.map((document) => {
        const data = document.payload.doc.data() as IProduct;
        const id = document.payload.doc.id;
        return { id, ...data };
      });
      console.log(this.products)
    });
  }

}
