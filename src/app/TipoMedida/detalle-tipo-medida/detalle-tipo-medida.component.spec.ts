import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTipoMedidaComponent } from './detalle-tipo-medida.component';

describe('DetalleTipoMedidaComponent', () => {
  let component: DetalleTipoMedidaComponent;
  let fixture: ComponentFixture<DetalleTipoMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTipoMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTipoMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
