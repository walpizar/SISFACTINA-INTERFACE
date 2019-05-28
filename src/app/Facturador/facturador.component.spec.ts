import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturadorComponent } from './facturador.component';

describe('FacturaComponent', () => {
  let component: FacturadorComponent;
  let fixture: ComponentFixture<FacturadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
