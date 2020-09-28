import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
     AOS.init()
  }

}
