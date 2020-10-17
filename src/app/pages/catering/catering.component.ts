import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-catering',
  templateUrl: './catering.component.html',
  styleUrls: ['./catering.component.scss']
})
export class CateringComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init()
  }
  scrollTo(id: string): void {
    const elmnt = document.getElementById(id);
    elmnt.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
  public config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination-catering',
      type: 'bullets',
      clickable: true
    },
    centeredSlides: false,
    allowTouchMove: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    },
    loop: true
  };

}
