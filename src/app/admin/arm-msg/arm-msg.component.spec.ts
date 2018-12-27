import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmMsgComponent } from './arm-msg.component';

describe('ArmMsgComponent', () => {
  let component: ArmMsgComponent;
  let fixture: ComponentFixture<ArmMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
