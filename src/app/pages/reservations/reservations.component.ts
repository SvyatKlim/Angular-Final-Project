import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  formHorizontal: boolean = true
  constructor() { }

  ngOnInit(): void {
  }

}
