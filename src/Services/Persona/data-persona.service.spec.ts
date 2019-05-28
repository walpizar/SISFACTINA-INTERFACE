import { TestBed } from '@angular/core/testing';

import { DataPersonaService } from './data-persona.service';

describe('DataPersonaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataPersonaService = TestBed.get(DataPersonaService);
    expect(service).toBeTruthy();
  });
});
