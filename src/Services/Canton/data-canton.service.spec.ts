import { TestBed } from '@angular/core/testing';

import { DataCantonService } from './canton.service';

describe('DataCantonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCantonService = TestBed.get(DataCantonService);
    expect(service).toBeTruthy();
  });
});
