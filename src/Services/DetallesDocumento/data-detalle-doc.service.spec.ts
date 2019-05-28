import { TestBed } from '@angular/core/testing';

import { DataDetalleDocService } from './data-detalle-doc.service';

describe('DataDetalleDocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataDetalleDocService = TestBed.get(DataDetalleDocService);
    expect(service).toBeTruthy();
  });
});
