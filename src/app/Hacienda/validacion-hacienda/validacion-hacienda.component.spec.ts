import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionHaciendaComponent } from './validacion-hacienda.component';

describe('ValidacionHaciendaComponent', () => {
  let component: ValidacionHaciendaComponent;
  let fixture: ComponentFixture<ValidacionHaciendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionHaciendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionHaciendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
