import { Component, OnInit, ViewChild } from '@angular/core';
import { IReserv } from '../../shared/interfaces/reservation.interface';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CatImgDeleteComponent } from '../../shared/components/cat-img-delete/cat-img-delete.component';
import { ReservationService } from '../../shared/services/reservation.service';

@Component({
  selector: 'app-admin-reserv',
  templateUrl: './admin-reserv.component.html',
  styleUrls: ['./admin-reserv.component.scss']
})
export class AdminReservComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'date', 'email', 'name', 'people', 'time', 'status']
  reservArr: IReserv[] = [];
  constructor(private fireStorag: AngularFireStorage,
    public dialog: MatDialog, private reservService: ReservationService) { }

  ngOnInit(): void {
    this.adminFireCloudReserv()
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CatImgDeleteComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // this.fireStorag.storage.refFromURL(this.productImg).delete();
        // this.imageStatus = false;
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
  deleteReserv(order: IReserv): void {
    const dialogRef = this.dialog.open(CatImgDeleteComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.reservService
          .deleteFireCloudReserv(order.dataID.toString())
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      }
    });
  }
  private adminFireCloudReserv(): void {
    this.reservService.getFireCloudReserv().subscribe((collection) => {
      this.reservArr = collection.map((document) => {
        const data = document.payload.doc.data() as IReserv;
        const id = document.payload.doc.id;
        return { id, ...data };
      });
      this.dataSource.data = this.reservArr
    });
  }
}
