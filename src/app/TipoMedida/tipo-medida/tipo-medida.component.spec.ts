import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMedidaComponent } from './tipo-medida.component';

describe('TipoMedidaComponent', () => {
  let component: TipoMedidaComponent;
  let fixture: ComponentFixture<TipoMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
