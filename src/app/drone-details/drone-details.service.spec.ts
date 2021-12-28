import { TestBed } from '@angular/core/testing';

import { DroneDetailsService } from './drone-details.service';

describe('DroneDetailsService', () => {
  let service: DroneDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroneDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
