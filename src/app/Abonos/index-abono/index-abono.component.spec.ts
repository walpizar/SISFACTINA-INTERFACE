import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAbonoComponent } from './index-abono.component';

describe('IndexAbonoComponent', () => {
  let component: IndexAbonoComponent;
  let fixture: ComponentFixture<IndexAbonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexAbonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
