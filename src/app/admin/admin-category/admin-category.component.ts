import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {
  MatDialog,
} from '@angular/material/dialog';
import { CatImgDeleteComponent } from 'src/app/shared/components/cat-img-delete/cat-img-delete.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  categoriesArray: Array<ICategory> = [];
  catID = 1;
  name: string;
  description: string;
  image: string;
  value: string = '';
  imageStatus: boolean;
  uploadProgress: Observable<number>;
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  columnsToDisplay = ['id', 'name', 'description', 'image', 'delete'];
  constructor(
    private catService: CategoryService,
    private fireStorag: AngularFireStorage,
    public dialog: MatDialog
  ) { }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.adminFireCloudCategories();
  }

  private adminFireCloudCategories(): void {
    this.catService.getFireCloudCategory().subscribe((collection) => {
      this.categoriesArray = collection.map((document) => {
        const data = document.payload.doc.data() as ICategory;
        const id = document.payload.doc.id;
        return { id, ...data };
      });
      this.dataSource.data = this.categoriesArray
    });
  }
  addCategory(): void {
    const newC = new Category(
      this.catID,
      this.name,
      this.description,
      this.image
    );
    delete newC.id;
    if (this.name !== '' && this.description !== '' && this.image !== '') {
      this.catService
        .postFireCloudCategory({ ...newC })
        .then((message) => console.log(message))
        .catch((err) => console.log(err));
      this.resetForm();
      this.imageStatus = false;
    }
  }

  private resetForm(): void {
    this.name = '';
    this.description = '';
    this.image = '';
  }
  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/category/${name}.${type}`;
    const upload = this.fireStorag.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then((imageUp) => {
      this.fireStorag
        .ref(`images/category/${imageUp.metadata.name}`)
        .getDownloadURL()
        .subscribe((url) => {
          this.image = url;
          this.imageStatus = true;
        });
    });
  }

  // Modal Window
  openDialog(): void {
    const dialogRef = this.dialog.open(CatImgDeleteComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.fireStorag.storage.refFromURL(this.image).delete();
        this.imageStatus = false;
      } else {
        console.log(`sorry you get ${result}`);
      }
    });
  }

  deleteCategory(category: ICategory): void {
    const dialogRef = this.dialog.open(CatImgDeleteComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.catService
          .deleteFireCloudCategory(category.id.toString())
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      }
    });
  }
  // chooseSort(value: string): void {
  //   if (value === this.orderName) {
  //     this.orderDirection = !this.orderDirection;
  //   }
  //   this.orderName = value;
  // }
}
