import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CatImgDeleteComponent } from '../../shared/components/cat-img-delete/cat-img-delete.component';
import { ICatCont } from '../../shared/interfaces/cat-contact.interface';
import { CatContactService } from '../../shared/services/cat-contact.service';
@Component({
  selector: 'app-admin-helper',
  templateUrl: './admin-helper.component.html',
  styleUrls: ['./admin-helper.component.scss']
})
export class AdminHelperComponent implements OnInit {
  dataSource = new MatTableDataSource();
  dataSourceSec = new MatTableDataSource();
  displayedColumns: string[] = ['email', 'name', 'message', 'phone', 'delete']
  displayedColumnsSec: string[] = ['email', 'name', 'message', 'delete']
  cateringArr: ICatCont[] = [];
  contactArr: ICatCont[] = [];

  constructor(public dialog: MatDialog, private helperService: CatContactService,) { }
  @ViewChild('sorter1') sorter1: MatSort;
  @ViewChild('sorter2') sorter2: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  ngOnInit(): void {
    this.dataSourceSec.paginator = this.paginator2;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sorter1;
    this.dataSourceSec.sort = this.sorter2;
    this.adminFireCloudCat()
    this.adminFireCloudCont()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilterSec(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSec.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceSec.paginator) {
      this.dataSourceSec.paginator.firstPage();
    }
  }
  private adminFireCloudCat(): void {
    this.helperService.getFireCloudCateringOrder().subscribe((collection) => {
      this.cateringArr = collection.map((document) => {
        const data = document.payload.doc.data() as ICatCont;
        const dataID = document.payload.doc.id;
        return { dataID, ...data };
      });
      this.dataSource.data = this.cateringArr
    });
  }
  deleteCat(order: ICatCont): void {
    const dialogRef = this.dialog.open(CatImgDeleteComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.helperService
          .deleteFireCloudCateringOrder(order.dataID.toString())
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      }
    });
  }


  private adminFireCloudCont(): void {
    this.helperService.getFireCloudContactOrder().subscribe((collection) => {
      this.contactArr = collection.map((document) => {
        const data = document.payload.doc.data() as ICatCont;
        const dataID = document.payload.doc.id;
        return { dataID, ...data };
      });
      this.dataSourceSec.data = this.contactArr
      console.log(this.dataSourceSec)
    });
  }
  deleteCont(order: ICatCont): void {
    const dialogRef = this.dialog.open(CatImgDeleteComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.helperService
          .deleteFireCloudContactOrder(order.dataID.toString())
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      }
    });
  }

}
