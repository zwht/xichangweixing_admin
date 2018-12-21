import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMsgComponent } from './work-msg.component';

describe('WorkMsgComponent', () => {
  let component: WorkMsgComponent;
  let fixture: ComponentFixture<WorkMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
