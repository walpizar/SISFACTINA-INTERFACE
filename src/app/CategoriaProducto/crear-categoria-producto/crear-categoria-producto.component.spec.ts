import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCategoriaProductoComponent } from './crear-categoria-producto.component';

describe('CrearCategoriaProductoComponent', () => {
  let component: CrearCategoriaProductoComponent;
  let fixture: ComponentFixture<CrearCategoriaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCategoriaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
