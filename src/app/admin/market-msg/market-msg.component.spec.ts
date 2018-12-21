import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMsgComponent } from './market-msg.component';

describe('MarketMsgComponent', () => {
  let component: MarketMsgComponent;
  let fixture: ComponentFixture<MarketMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
