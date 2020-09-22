import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservComponent } from './admin-reserv.component';

describe('AdminReservComponent', () => {
  let component: AdminReservComponent;
  let fixture: ComponentFixture<AdminReservComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReservComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
