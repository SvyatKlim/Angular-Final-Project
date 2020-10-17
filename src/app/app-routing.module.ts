import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { CateringComponent } from './pages/catering/catering.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { FdAdminComponent } from './pages/fd-admin/fd-admin.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminReservComponent } from './admin/admin-reserv/admin-reserv.component';
import { RestaurantComponent } from './pages/menu/restaurant/restaurant.component';
import { DeliveryComponent } from './pages/menu/delivery/delivery.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileGuard } from './shared/guards/profile.guard';
import { AdminHelperComponent } from './admin/admin-helper/admin-helper.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path: '', redirectTo: 'delivery', pathMatch: 'full' },
      { path: 'restaurant', component: RestaurantComponent },
      {
        path: 'delivery',
        component: DeliveryComponent,
      },
    ],
  },
  { path: 'about', component: AboutComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'delivery/:category', component: ProductComponent },
  { path: 'delivery/:category/:id', component: ProductDetailsComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'catering', component: CateringComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'fd-admin', component: FdAdminComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminCategoryComponent },
      { path: 'admin-category', component: AdminCategoryComponent },
      { path: 'admin-product', component: AdminProductComponent },
      { path: 'admin-order', component: AdminOrderComponent },
      { path: 'admin-helper', component: AdminHelperComponent },
      { path: 'admin-reserv', component: AdminReservComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
