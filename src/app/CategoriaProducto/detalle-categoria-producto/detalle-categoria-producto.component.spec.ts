import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCategoriaProductoComponent } from './detalle-categoria-producto.component';

describe('DetalleCategoriaProductoComponent', () => {
  let component: DetalleCategoriaProductoComponent;
  let fixture: ComponentFixture<DetalleCategoriaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCategoriaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
