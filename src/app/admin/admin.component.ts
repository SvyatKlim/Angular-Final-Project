import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  sideBarOpen: boolean = true;
  value: string = 'Clear me';
  ngOnInit(): void { }
  sideBarToggler(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
