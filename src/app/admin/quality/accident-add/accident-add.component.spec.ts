import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentAddComponent } from './accident-add.component';

describe('AccidentAddComponent', () => {
  let component: AccidentAddComponent;
  let fixture: ComponentFixture<AccidentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
