import { TestBed } from '@angular/core/testing';

import { CanditateService } from './canditate.service';

describe('CanditateService', () => {
  let service: CanditateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanditateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
