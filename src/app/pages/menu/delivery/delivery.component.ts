import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { ProductService } from '../../../shared/services/product.service';
import AOS from 'aos';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  categories: Array<ICategory>;
  constructor(private catService: CategoryService) { }
  ngOnInit(): void {
    this.getFireCloudCategories();
    AOS.init()
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
}
