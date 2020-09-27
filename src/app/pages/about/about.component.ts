import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  load_completed: boolean = false
  constructor() { }

  ngOnInit(): void {
    AOS.init()
    this.load_completed = true;
  }
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination-testemonials',
      type: 'bullets',
      clickable: true
    },
    allowTouchMove: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    slidesPerView: 1,
    loop: true
  };

}
