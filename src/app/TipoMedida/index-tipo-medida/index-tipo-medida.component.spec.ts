import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTipoMedidaComponent } from './index-tipo-medida.component';

describe('IndexTipoMedidaComponent', () => {
  let component: IndexTipoMedidaComponent;
  let fixture: ComponentFixture<IndexTipoMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexTipoMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTipoMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
