import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CatImgDeleteComponent } from 'src/app/shared/components/cat-img-delete/cat-img-delete.component';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit, AfterViewInit {
  categories: Array<ICategory> = [];
  categoryName: string;
  products: IProduct[] = [];
  productID: string = '1';
  productCategory: ICategory;
  productCat: string;
  productName: string;
  productImg: string = '';
  productIngridients: any;
  productPrice: number;
  productWeight: string;
  productDesc: string;
  productVegetarian: boolean = false;
  imageStatus: boolean;
  editStatus: boolean;
  value: any = '';
  files: any[] = [];
  displayedColumns: string[] = [
    'id',
    'category',
    'name',
    'ingridients',
    'vegetarian',
    'price',
    'urlName',
    'description',
    'img',
    'edit',
    'delete',
  ];
  items: any;
  foods: Array<any>;
  uploadProgress: Observable<number>;
  dataSource = new MatTableDataSource();

  constructor(
    private catService: CategoryService,
    private prodService: ProductService,
    private fireStorag: AngularFireStorage,
    public dialog: MatDialog
  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.adminFireCloudCategories();
    this.adminFireCloudProducts();
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

  private adminFireCloudProducts(): void {
    this.prodService.getFireCloudProduct().subscribe((collection) => {
      this.products = collection.map((document) => {
        const data = document.payload.doc.data() as IProduct;
        const id = document.payload.doc.id;
        return { id, ...data };
      });
      this.dataSource.data = this.products
      console.log(this.products)
    });
  }
  setCategory(): void {
    this.productCategory = this.categories.filter(
      (cat) => cat.nameEN === this.categoryName
    )[0];
  }

  addProduct(): void {
    const newProd = new Product(
      this.productID,
      this.productCat,
      this.productName,
      this.productVegetarian,
      this.productIngridients.split(''),
      this.productWeight,
      this.productPrice,
      this.productDesc,
      this.productImg
    );
    if (!this.editStatus) {
      delete newProd.dataID;
      this.prodService
        .postFireCloudProduct({ ...newProd })
        .then((message) => console.log(message))
        .catch((err) => console.log(err));
    } else {
      this.prodService
        .updateFireCloudProduct({ ...newProd })
        .then((message) => console.log(message))
        .catch((err) => console.log(err));
      this.editStatus = false;
    }
    this.resetForm();
  }
  private resetForm(): void {
    this.imageStatus = false;
    this.productCat = '';
    this.productName = '';
    this.productIngridients = '';
    this.productWeight = null
    this.productDesc = '';
    this.productPrice = null;
    this.productVegetarian = false;
    this.productImg = '';
  }
  deleteProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(CatImgDeleteComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.prodService
          .deleteFireCloudProduct(product.dataID.toString())
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      }
    });
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/product/${this.productCat}/${name}.${type}`;
    const upload = this.fireStorag.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then((imageUp) => {
      this.fireStorag
        .ref(`images/product/${this.productCat}/${imageUp.metadata.name}`)
        .getDownloadURL()
        .subscribe((url) => {
          this.productImg = url;
          this.imageStatus = true;
        });
    });
  }

  editProduct(product: IProduct): void {
    this.productCat = product.category,
      this.productName = product.name,
      this.productVegetarian = product.vegetarian,
      this.productIngridients = product.ingridients.join(),
      this.productWeight = product.weight,
      this.productPrice = product.price,
      this.productDesc = product.description,
      this.productImg = product.img,
      this.editStatus = true; this.imageStatus = true;
  }
  // Modal Window
  openDialog(): void {
    const dialogRef = this.dialog.open(CatImgDeleteComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.fireStorag.storage.refFromURL(this.productImg).delete();
        this.imageStatus = false;
      } else {
        console.log(`sorry you get ${result}`);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
