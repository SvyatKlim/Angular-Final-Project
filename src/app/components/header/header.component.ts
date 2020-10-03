import {
  Component,
  OnInit,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '../../shared/interfaces/product.interface';
import { OrderService } from '../../shared/services/order.service';
import { LoginComponent } from '../../pages/login/login.component';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  topPosToStartShowing = 100;
  breakpoint: boolean = false;
  showMenu: boolean = false;
  constructor(private orderService: OrderService, public dialog: MatDialog, private authService: AuthService) { }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.showMenu = false
  }

  ngOnInit(): void {
    this.checkBasket();
    this.getlocalProducts();
    this.checkLogin();
    this.updateCheckLogin()
    this.handleScroll()
    console.log(this.breakpoint)
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

    console.log(document.body.clientWidth)
    if (document.body.clientWidth > 1199) {
      this.breakpoint = false
    } if (document.body.clientWidth < 1200) {
      this.breakpoint = true
      this.sticky = true;
    }
    if (windowScroll > 100) {
      this.sticky = true;
    }
    else {
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
        return total + +product.count;
      }, 0);
    }
  }

  openDialog(): void {
    this.showMenu = false
    this.dialog.open(LoginComponent);
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
    if (user) {
      if (!user.role) {
        this.userLogined = false;
      }
      if (user != 0 && user.role === 'user') {
        this.userLogined = true;
      } else {
        this.userLogined = false;
      }
    } else {
      this.userLogined = false;
    }

  }
  deleteProdBasket(product: IProduct): void {
    const index = this.basket.findIndex(prod => prod.dataID === product.dataID);
    this.basket.splice(index, 1);
    this.updateBasket();
  }
  private updateBasket(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.basket));
    this.getlocalProducts();
    this.orderService.basket.next('go');
  }
  isShowMenu(): void {
    this.showMenu = !this.showMenu
  }
}
