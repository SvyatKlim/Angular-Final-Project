import { HostListener, AfterContentInit } from '@angular/core';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Renderer2 } from '@angular/core';
import Parallax from 'parallax-js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(2500)),
    ]),
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, AfterContentInit {
  load_completed = false;
  constructor(private renderer: Renderer2) { }
  ngAfterContentInit(): void {
    const scene = document.getElementById('scene');
    const scene2 = document.getElementById('scene2');
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true,
      hoverOnly: true
    });
    const parallaxInstance2 = new Parallax(scene2, {
      relativeInput: true,
      hoverOnly: true
    });
  }
  ngOnInit(): void {
    this.load_completed = true;
  }

}
