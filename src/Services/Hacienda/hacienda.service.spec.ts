import { TestBed } from '@angular/core/testing';

import { HaciendaService } from './hacienda.service';

describe('HaciendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HaciendaService = TestBed.get(HaciendaService);
    expect(service).toBeTruthy();
  });
});
