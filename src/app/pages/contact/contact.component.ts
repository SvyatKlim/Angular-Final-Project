import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: boolean = true;
  constructor() { }

  ngOnInit(): void {
    AOS.init()
  }

}
