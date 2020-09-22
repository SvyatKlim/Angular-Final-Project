import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cat-img-delete',
  templateUrl: './cat-img-delete.component.html',
  styleUrls: ['./cat-img-delete.component.scss'],
})
export class CatImgDeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CatImgDeleteComponent>) {}
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
