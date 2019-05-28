import { TestBed } from '@angular/core/testing';

import { DataClienteService } from './data-cliente.service';

describe('DataClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataClienteService = TestBed.get(DataClienteService);
    expect(service).toBeTruthy();
  });
});
