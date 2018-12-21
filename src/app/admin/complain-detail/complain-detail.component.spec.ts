import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainDetailComponent } from './complain-detail.component';

describe('ComplainDetailComponent', () => {
  let component: ComplainDetailComponent;
  let fixture: ComponentFixture<ComplainDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
