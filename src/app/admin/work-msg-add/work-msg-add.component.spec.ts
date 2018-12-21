import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMsgAddComponent } from './work-msg-add.component';

describe('WorkMsgAddComponent', () => {
  let component: WorkMsgAddComponent;
  let fixture: ComponentFixture<WorkMsgAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkMsgAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMsgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
