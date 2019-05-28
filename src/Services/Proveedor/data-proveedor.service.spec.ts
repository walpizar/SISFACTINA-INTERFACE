import { TestBed } from '@angular/core/testing';

import { DataProveedorService } from './data-proveedor.service';

describe('DataProveedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataProveedorService = TestBed.get(DataProveedorService);
    expect(service).toBeTruthy();
  });
});
