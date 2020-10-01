import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  reservBtn: boolean = false
  constructor() { }
  ngOnInit(): void {
    AOS.init()
  }
  viewReserv(): void {
    this.reservBtn = !this.reservBtn
  }

}
