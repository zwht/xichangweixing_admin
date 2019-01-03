import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionAddComponent } from './solution-add.component';

describe('SolutionAddComponent', () => {
  let component: SolutionAddComponent;
  let fixture: ComponentFixture<SolutionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
