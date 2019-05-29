import { TestBed } from '@angular/core/testing';
import { DataBarriosService } from './barrios.service';



describe('DataBarriosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataBarriosService = TestBed.get(DataBarriosService);
    expect(service).toBeTruthy();
  });
});
