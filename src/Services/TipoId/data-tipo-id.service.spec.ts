import { TestBed } from '@angular/core/testing';

import { DataTipoIdService } from './data-tipo-id.service';

describe('DataTipoIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTipoIdService = TestBed.get(DataTipoIdService);
    expect(service).toBeTruthy();
  });
});
