import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProductComponent } from './pages/product/product.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CateringComponent } from './pages/catering/catering.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { RestaurantComponent } from './pages/menu/restaurant/restaurant.component';
import { DeliveryComponent } from './pages/menu/delivery/delivery.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { CounterComponent } from './components/counter/counter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketComponent } from './pages/basket/basket.component';
import { BasketDialogComponent } from './shared/components/basket-dialog/basket-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservationFormComponent } from './shared/components/reservation-form/reservation-form.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    ProductComponent,
    ReservationsComponent,
    GalleryComponent,
    CateringComponent,
    ContactComponent,
    LoginComponent,
    UserComponent,
    UserProfileComponent,
    UserOrdersComponent,
    RestaurantComponent,
    DeliveryComponent,
    ProductDetailsComponent,
    CounterComponent,
    BasketComponent,
    BasketDialogComponent,
    ProfileComponent,
    ReservationFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    CalendarModule,
    Ng2SearchPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BasketDialogComponent, LoginComponent],
})
export class AppModule { }