import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdAdminComponent } from './fd-admin.component';

describe('FdAdminComponent', () => {
  let component: FdAdminComponent;
  let fixture: ComponentFixture<FdAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
