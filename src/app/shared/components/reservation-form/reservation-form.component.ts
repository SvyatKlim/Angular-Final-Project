import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  public minDate: Date = new Date("09/21/2020");
  public maxDate: Date = new Date("12/31/2020");
  public value: Date = new Date("09/22/2020");
  dateValue: string;
  count:string;
  timeTable: string;
  guestCount: Array<object> = [
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
  time: Array<object> = [
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
  constructor() { }

  ngOnInit(): void {
  }
  onValueChange(args: any): void {
    /*Displays selected date in the label*/
    this.dateValue = args.value.toLocaleDateString();
  }

}
