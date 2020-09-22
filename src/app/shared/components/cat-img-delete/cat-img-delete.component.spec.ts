import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatImgDeleteComponent } from './cat-img-delete.component';

describe('CatImgDeleteComponent', () => {
  let component: CatImgDeleteComponent;
  let fixture: ComponentFixture<CatImgDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatImgDeleteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatImgDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
