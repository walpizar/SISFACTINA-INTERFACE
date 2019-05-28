import { TestBed } from '@angular/core/testing';

import { ProducserviceService } from './producservice.service';

describe('ProducserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProducserviceService = TestBed.get(ProducserviceService);
    expect(service).toBeTruthy();
  });
});
