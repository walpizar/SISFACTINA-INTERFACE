import { TestBed } from '@angular/core/testing';

import { ImpuestosService } from './impuestos.service';

describe('ImpuestosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImpuestosService = TestBed.get(ImpuestosService);
    expect(service).toBeTruthy();
  });
});
