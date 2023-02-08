import { TestBed } from '@angular/core/testing';

import { CanditService } from './candit.service';

describe('CanditService', () => {
  let service: CanditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
