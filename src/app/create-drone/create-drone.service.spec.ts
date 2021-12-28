import { TestBed } from '@angular/core/testing';

import { CreateDroneService } from './create-drone.service';

describe('CreateDroneService', () => {
  let service: CreateDroneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDroneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
