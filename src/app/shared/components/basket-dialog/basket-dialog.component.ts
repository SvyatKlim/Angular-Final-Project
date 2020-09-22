import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})
export class BasketDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BasketDialogComponent>) { }
  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
