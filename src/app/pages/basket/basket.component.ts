import { ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/models/order.models';
import { MatDialog } from '@angular/material/dialog';
import { BasketDialogComponent } from '../../shared/components/basket-dialog/basket-dialog.component';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket: Array<IProduct>;
  basketLength: boolean = false;
  totalPrice: number;
  thenBlock: TemplateRef<any>;
  order: boolean = true;
  checkout: boolean = false;
  orderComplete: boolean = false;
  dataID: string = '1';
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhone: string;
  userCity: string;
  userAddress: string;
  userComment: string;
  statusOrder: string
  userOrder: Array<IProduct>;
  payment: string;
  dateOrder: Date;
  totalPayment: number;
  submitted = false;
  marked = false;
  loginedUserId: string = 'none';
  constructor(private orderService: OrderService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getlocalProducts();
    this.getLoginedUser()
    console.log(this.loginedUserId);
  }
  toggleVisibility(e) {
    console.log(e.target.checked)
    this.marked = e.target.checked;
  }
  private checkBasket(): void {
    this.orderService.basket.subscribe(() => {
      this.getlocalProducts();
    });
  }
  private getlocalProducts(): void {
    if (localStorage.getItem('myOrder')) {
      this.basket = JSON.parse(localStorage.getItem('myOrder'));
      this.getTotal();
      if (this.basket.length > 0) {
        this.basketLength = true
      }
    }
  }
  private getTotal(): void {
    this.totalPrice = this.basket.reduce((total, product) => {
      return total + product.price * product.count;
    }, 0);
  }
  toCheckout(): void {
    this.order = false;
    this.checkout = true;
  }
  private updateBasket(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.basket));
    this.getTotal();
    this.orderService.basket.next('віфвіф');
  }
  detectChangeCount(status: boolean): void {
    if (status) {
      this.updateBasket()
    }
  }
  openDialog(product: IProduct): void {
    const dialogRef = this.dialog.open(BasketDialogComponent, {
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const index = this.basket.findIndex(prod => prod.dataID === product.dataID);
        this.basket.splice(index, 1);
        this.updateBasket();
        if (this.basket.length < 1) {
          this.basketLength = false;
        }
      } else {
        dialogRef.close()
      }

    })
  }
  private getLoginedUser(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.loginedUserId = user.id
    }
  }

  addOrder(): void {
    const order = new Order(
      this.dataID,
      this.userFirstName,
      this.userLastName,
      this.userPhone,
      this.userEmail,
      this.userCity,
      this.userAddress,
      this.userComment,
      this.basket,
      this.payment = 'cash',
      this.totalPayment = this.totalPrice,
      this.dateOrder = new Date(),
      this.statusOrder = 'in processing',
      this.loginedUserId
    );

    delete order.dataID;
    this.orderService.postFireCloudOrder({ ...order })
      .then(() => this.resetForm())
      .catch(err => console.log(err));
    console.log(order)
    this.orderComplete = true;
    this.checkout = false
  }
  private resetForm(): void {
    localStorage.removeItem('myOrder');
    this.basket = [];
    this.orderService.basket.next('');
    this.resetCheckInput()
  }
  private resetCheckInput(): void {
    this.userFirstName = '';
    this.userLastName = '';
    this.userEmail = '';
    this.userPhone = '';
    this.userCity = '';
    this.userAddress = '';
    this.userComment = '';
  }
}
