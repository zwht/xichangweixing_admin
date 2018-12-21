import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMsgComponent } from './party-msg.component';

describe('PartyMsgComponent', () => {
  let component: PartyMsgComponent;
  let fixture: ComponentFixture<PartyMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
