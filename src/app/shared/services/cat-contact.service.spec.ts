import { TestBed } from '@angular/core/testing';

import { CatContactService } from './cat-contact.service';

describe('CatContactService', () => {
  let service: CatContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
