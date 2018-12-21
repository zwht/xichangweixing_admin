import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMsgAddComponent } from './market-msg-add.component';

describe('MarketMsgAddComponent', () => {
  let component: MarketMsgAddComponent;
  let fixture: ComponentFixture<MarketMsgAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketMsgAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketMsgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
