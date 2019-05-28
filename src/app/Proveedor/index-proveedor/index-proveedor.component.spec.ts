import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProveedorComponent } from './index-proveedor.component';

describe('IndexProveedorComponent', () => {
  let component: IndexProveedorComponent;
  let fixture: ComponentFixture<IndexProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
