import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmMsgAddComponent } from './arm-msg-add.component';

describe('ArmMsgAddComponent', () => {
  let component: ArmMsgAddComponent;
  let fixture: ComponentFixture<ArmMsgAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmMsgAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmMsgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
