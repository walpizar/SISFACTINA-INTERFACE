import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAbonosComponent } from './detalles-abonos.component';

describe('DetallesAbonosComponent', () => {
  let component: DetallesAbonosComponent;
  let fixture: ComponentFixture<DetallesAbonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesAbonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesAbonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
