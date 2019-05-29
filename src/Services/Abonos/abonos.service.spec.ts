import { TestBed } from '@angular/core/testing';
import { DataAbonosService } from './abonos.service';



describe('DataAbonosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAbonosService = TestBed.get(DataAbonosService);
    expect(service).toBeTruthy();
  });
});
