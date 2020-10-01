import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { ViewportScroller } from '@angular/common';
// import { element } from 'protractor';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-catering',
  templateUrl: './catering.component.html',
  styleUrls: ['./catering.component.scss']
})
export class CateringComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    AOS.init()
  }
  scrollTo(id: string): void {
    console.log(id)
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
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true
  };

}
