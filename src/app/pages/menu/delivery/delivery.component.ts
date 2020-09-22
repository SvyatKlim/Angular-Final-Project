import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  categories: Array<object>;
  constructor(private catService: CategoryService) {}

  ngOnInit(): void {
    this.adminFireCloudCategories();
  }
  private adminFireCloudCategories(): void {
    this.catService.getFireCloudCategory().subscribe((collection) => {
      this.categories = collection.map((document) => {
        const data = document.payload.doc.data() as ICategory;
        const id = document.payload.doc.id;
        return { id, ...data };
      });
    });
  }
}
