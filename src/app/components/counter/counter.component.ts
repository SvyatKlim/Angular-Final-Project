import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() count: number;
  @Output() changeCount = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }


  productCount(status: boolean): void {
    if (status) {
      this.count++;
    }
    else {
      if (this.count > 1) {
        this.count--;
      }
    }
    this.changeCount.emit(this.count);
  }

}
