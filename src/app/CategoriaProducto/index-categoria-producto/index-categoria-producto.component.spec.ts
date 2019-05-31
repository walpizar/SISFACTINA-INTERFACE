import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCategoriaProductoComponent } from './index-categoria-producto.component';

describe('IndexCategoriaProductoComponent', () => {
  let component: IndexCategoriaProductoComponent;
  let fixture: ComponentFixture<IndexCategoriaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexCategoriaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
