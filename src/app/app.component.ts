import { Component } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-delivery';
  isAdmin: boolean = false;
  adminPages: object = {
    0: '/admin',
    1: '/admin/admin-category',
    2: '/admin/admin-product',
    3: '/admin/admin-helper',
    4: '/admin/admin-order',
    5: '/admin/admin-reserv',
  };
  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const urlName = this.router.routerState.snapshot.url;
        if (
          urlName === this.adminPages[0] ||
          urlName === this.adminPages[1] ||
          urlName === this.adminPages[2] ||
          urlName === this.adminPages[3] ||
          urlName === this.adminPages[4] ||
          urlName === this.adminPages[5]
        ) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    });
  }
}
