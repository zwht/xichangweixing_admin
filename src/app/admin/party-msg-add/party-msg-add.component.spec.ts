import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMsgAddComponent } from './party-msg-add.component';

describe('PartyMsgAddComponent', () => {
  let component: PartyMsgAddComponent;
  let fixture: ComponentFixture<PartyMsgAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyMsgAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMsgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
