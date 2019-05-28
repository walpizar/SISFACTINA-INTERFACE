import { TestBed } from '@angular/core/testing';

import { TipoCompraService } from './tipo-compra.service';

describe('TipoCompraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoCompraService = TestBed.get(TipoCompraService);
    expect(service).toBeTruthy();
  });
});
