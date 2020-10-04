import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AuthService } from '../../shared/services/auth.service';
import { OrderService } from '../../shared/services/order.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReservationService } from '../../shared/services/reservation.service';
import { IReserv } from '../../shared/interfaces/reservation.interface';
import AOS from 'aos';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;
  profile: boolean = true;
  orderLink: boolean = false;
  reservLink: boolean = false;
  logUserID: string;
  userOrder: Array<any> = []
  userReserv: Array<any> = []
  constructor(private authService: AuthService, private firecloud: AngularFirestore, private reservServics: ReservationService) { }

  ngOnInit(): void {
    this.getUserData()
    this.getOrders()
    this.getResrvationOrder()
    AOS.init()
  }
  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    this.email = user.userEmail;
    this.firstName = user.userFirstName;
    this.lastName = user.userLastName
    this.logUserID = user.id;
  }
  changeProfile(link: string): void {
    if (link === 'profile') {
      this.orderLink = false;
      this.profile = true;
      this.reservLink = false;
    }
    if (link === 'order') {
      this.orderLink = true;
      this.profile = false;
      this.reservLink = false;
    }
    if (link === 'reservation') {
      this.orderLink = false;
      this.profile = false;
      this.reservLink = true;
    }
  }
  signOut(): void {
    this.authService.signOut()
  }
  private getOrders(): void {
    this.firecloud
      .collection('orders')
      .ref.where('userId', '==', this.logUserID).onSnapshot((collection) => {
        collection.forEach((document) => {
          const data = document.data();
          this.userOrder.push(data);
        });
      })
  }
  private getResrvationOrder(): void {
    this.firecloud
      .collection('reservation')
      .ref.where('userID', '==', this.logUserID).onSnapshot((collection) => {
        collection.forEach((doc) => {
          const data = doc.data();
          this.userReserv.push(data);
        });
        console.log(this.userReserv)
      })

  }
}
