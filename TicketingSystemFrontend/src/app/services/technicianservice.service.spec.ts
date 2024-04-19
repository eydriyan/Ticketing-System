import { TestBed } from '@angular/core/testing';

import { TechnicianserviceService } from './technicianservice.service';

describe('TechnicianserviceService', () => {
  let service: TechnicianserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicianserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
