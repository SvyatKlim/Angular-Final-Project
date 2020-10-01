import { Component, OnInit, Input } from '@angular/core';
import { Event } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReservationService } from '../../services/reservation.service';
import { IReserv } from '../../interfaces/reservation.interface';
import { Reservation } from '../../models/reservation.model';
import AOS from 'aos';
import {
  NgForm
} from '@angular/forms';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  @Input() statusForm: boolean;
  public minDate: Date = new Date("09/21/2020");
  public maxDate: Date = new Date("12/31/2020");
  public value: Date = new Date("09/22/2020");
  dateValue: string;
  count: string = 'Select an Option';
  name: string;
  email: string
  timeSelected: string;
  guestCount: Array<object>;
  time: Array<object>;
  place: Array<object>;
  loginedUserId: string;
  dataId: string;
  editStatus: boolean = false;
  progress: string = 'booked';
  formHorizon: boolean = false;
  directions: string = 'London East';
  constructor(private fireStorag: AngularFireStorage, private reservSerice: ReservationService) { }

  ngOnInit(): void {
    AOS.init()
    console.log(this.statusForm)
    this.guestCount = [
      { id: 0, name: '1 person' },
      { id: 1, name: '2 people' },
      { id: 2, name: '3 people' },
      { id: 3, name: '4 people' },
      { id: 4, name: '5 people' },
      { id: 5, name: '6 people' },
      { id: 6, name: '7 people' },
      { id: 7, name: '8 people' },
      { id: 8, name: '9 people' },
      { id: 9, name: '10 people' },
      { id: 10, name: '11 people' },
      { id: 11, name: '12 people' },
      { id: 12, name: '13 people' },
      { id: 13, name: '14 people' },
      { id: 14, name: '15 people' },
    ];
    this.time = [
      { id: 0, name: '6:00 pm' },
      { id: 1, name: '6:30 pm' },
      { id: 2, name: '7:00 pm' },
      { id: 3, name: '7:30 pm' },
      { id: 4, name: '8:00 pm' },
      { id: 5, name: '8:30 pm' },
      { id: 6, name: '9:30 pm' },
      { id: 7, name: '10:00 pm' },
      { id: 8, name: '10:30 pm' },
    ];
    this.place = [
      { id: 0, name: 'London East' },
      { id: 1, name: 'London Center' },
      { id: 2, name: 'Londin West' },
    ]
    this.getLoginedUser()
  }
  private getLoginedUser(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.loginedUserId = user.id
      } else {
        this.loginedUserId = 'guest'
      }
    } else {
      this.loginedUserId = 'guest'
    }
  }
  onValueChange(args: any): void {
    this.dateValue = args.value.toLocaleDateString();
  }
  onTimeSelected(event: Event): void {
    this.customFunction(event, 'time')
  }
  onPlaceSelected(event: Event): void {
    this.customFunction(event, 'place')
  }
  customFunction(val: any, detail: string): void {
    if (detail === 'time') { this.timeSelected = val }
    if (detail === 'count') { this.count = val }
    if (detail === 'place') { this.directions = val };
  }
  countSelected(event: Event): void {
    this.customFunction(event, 'count')
  }
  addReserv(form: NgForm): void {
    const reserv = new Reservation(
      this.dataId,
      this.loginedUserId,
      this.name,
      this.email,
      this.dateValue,
      this.timeSelected,
      this.count,
      this.progress,
      this.directions
    )
    if (!this.editStatus) {
      delete reserv.dataID;
      delete reserv.directions;
      this.reservSerice
        .postFireCloudReserv({ ...reserv })
        .then(() => this.reservSerice.showSuccess())
        .catch((err) => this.reservSerice.showError(err));
    }
    this.resetForm();
    console.log(reserv)
    form.resetForm()
  }
  addReservHorizontal(): void {
    const reserv = new Reservation(
      this.dataId,
      this.loginedUserId,
      this.name,
      this.email,
      this.dateValue,
      this.timeSelected,
      this.count,
      this.progress,
      this.directions
    )
    if (!this.editStatus) {
      delete reserv.dataID;
      this.reservSerice
        .postFireCloudReserv({ ...reserv })
        .then(() => this.reservSerice.showSuccess())
        .catch((err) => this.reservSerice.showError(err));
    }
    this.resetForm();
    console.log(reserv)
  }
  private resetForm(): void {
    if (this.formHorizon) {
      this.name = '';
      this.email = '';
      this.dateValue = '';
      this.timeSelected = 'Select an option';
      this.count = 'Select an option';
      this.directions = 'Choose directions...';
    } else {
      this.name = '';
      this.email = '';
      this.dateValue = '';
      this.timeSelected = 'Select an option';
      this.count = 'Select an option';
    }
  }
}
