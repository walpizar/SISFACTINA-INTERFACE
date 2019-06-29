import { TestBed } from '@angular/core/testing';

import { ExoneracionesService } from './exoneraciones.service';

describe('ExoneracionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExoneracionesService = TestBed.get(ExoneracionesService);
    expect(service).toBeTruthy();
  });
});
