import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product.interface';
import { OrderService } from '../../shared/services/order.service';
import { LoginComponent } from '../../pages/login/login.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  totalPrice: number;
  totalCount: number = 0;
  menuChecked: boolean = false;
  baskedChecked: boolean = false;
  sticky: boolean = false;
  basket: Array<IProduct>;
  userLogined: boolean = false;
  constructor(private router: Router, private orderService: OrderService, private elRef: ElementRef, public dialog: MatDialog, private authService: AuthService) { }
  ngOnInit(): void {
    this.checkBasket();
    this.getlocalProducts();
    this.checkLogin();
    this.updateCheckLogin()
  }
  openSelect(): void {
    this.menuChecked = !this.menuChecked;
  }
  closeSelect(): void {
    this.menuChecked = false;
  }
  openBasket(): void {
    this.baskedChecked = true;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    // console.log(windowScroll);
    if (windowScroll > 100) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
  private checkBasket(): void {
    this.orderService.basket.subscribe((data) => {
      this.getlocalProducts();
    });
  }
  private getlocalProducts(): void {
    if (localStorage.getItem('myOrder')) {
      this.basket = JSON.parse(localStorage.getItem('myOrder'));
      this.totalPrice = this.basket.reduce((total, product) => {
        return total + product.price * product.count;
      }, 0);
      this.totalCount = +this.basket.reduce((total, product) => {
        console.log(total + +product.count)
        return total + +product.count;
      }, 0);
    }
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
  private updateCheckLogin(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        this.checkLogin()
      }
    )
  }

  private checkLogin(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    // const admin = JSON.parse(localStorage.getItem('admin'))
    if (!user.role) {
      this.userLogined = false;
    }
    if (user != 0 && user.role === 'user') {
      this.userLogined = true;
    } else {
      this.userLogined = false;
    }
  }
}
