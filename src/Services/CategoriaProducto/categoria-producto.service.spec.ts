import { TestBed } from '@angular/core/testing';

import { CategoriaProductoService } from './categoria-producto.service';

describe('CategoriaProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriaProductoService = TestBed.get(CategoriaProductoService);
    expect(service).toBeTruthy();
  });
});
