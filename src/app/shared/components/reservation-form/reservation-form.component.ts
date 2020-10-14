import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import AOS from 'aos';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  @Input() statusForm: boolean;
  minDate: Date = new Date("09/21/2020");
  maxDate: Date = new Date("12/31/2020");
  value: Date = new Date("09/22/2020");
  dateValue: string = "21.09.2020";
  count: string = 'Select an Option';
  name: string;
  email: string
  timeSelected: string;
  guestCount: Array<string>;
  time: Array<string>;
  place: Array<string>;
  loginedUserId: string;
  dataId: string;
  editStatus: boolean = false;
  progress: string = 'booked';
  formHorizon: boolean = false;
  directions: string = 'London East';
  reservationForm: FormGroup;
  reservationFormVertical: FormGroup
  constructor(private reservSerice: ReservationService) { }

  ngOnInit(): void {
    this.getDeviceWidth();
    AOS.init()
    this.getLoginedUser()
    this.reservationForm = new FormGroup({
      user_id: new FormControl(this.loginedUserId),
      user_name: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-z]{1,32}")]),
      user_email: new FormControl(null, [Validators.email, Validators.required]),
      user_dateValue: new FormControl(null, Validators.required),
      user_timeSelected: new FormControl(null, Validators.required),
      user_count: new FormControl(null, Validators.required),
      user_progress: new FormControl('in process'),
      user_directions: new FormControl(null, Validators.required),
    })
    this.reservationFormVertical = new FormGroup({
      user_id: new FormControl(this.loginedUserId),
      user_name: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-z]{1,32}")]),
      user_email: new FormControl(null, [Validators.email, Validators.required]),
      user_dateValue: new FormControl(null, Validators.required),
      user_timeSelected: new FormControl(null, Validators.required),
      user_count: new FormControl(null, Validators.required),
      user_progress: new FormControl('in process'),
      user_directions: new FormControl('London East', Validators.required),
    })
    this.guestCount = [
      'Select an Option ...',
      '1 person',
      '2 people',
      '3 people',
      '4 people',
      '5 people',
      '6 people',
      '7 people',
      '8 people',
      '9 people',
      '10 people',
      '11 people',
      '12 people',
      '13 people',
      '14 people',
      '15 people',
    ];
    this.time = [
      'Select an Option ...',
      '6:00 pm',
      '6:30 pm',
      '7:00 pm',
      '7:30 pm',
      '8:00 pm',
      '8:30 pm',
      '9:30 pm',
      '10:00 pm',
      '10:30 pm',
    ];
    this.place = [
      'Choose a place ...',
      'London East',
      'London Center',
      'Londin West',
    ]
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

  onSubmit(form: string): void {
    this.addReserv(form)
    console.log(this.reservationForm)
  }

  private addReserv(formName: string): void {
    if (formName === 'horizontal') {
      this.reservSerice
        .postFireCloudReserv({ ...this.reservationForm.value })
        .then(() => this.reservSerice.showSuccess())
        .catch((err) => this.reservSerice.showError(err));
      this.reservationForm.reset({
        user_timeSelected: 'Select an Option ...',
        user_count: 'Select an Option ...',
        user_directions: 'Choose a place ...',
      });
    } else {
      this.reservSerice
        .postFireCloudReserv({ ...this.reservationFormVertical.value })
        .then(() => this.reservSerice.showSuccess())
        .catch((err) => this.reservSerice.showError(err));
      this.reservationFormVertical.reset({
        user_timeSelected: 'Select an Option ...',
        user_count: 'Select an Option ...',
        user_directions: 'Choose a place ...',
      });
    }
  }
  getDeviceWidth(): void {
    const width = document.body.clientWidth;
    if (width < 568) {
      this.statusForm = false
    }
  }
}
