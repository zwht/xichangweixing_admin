import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlinkComponent } from './outlink.component';

describe('OutlinkComponent', () => {
  let component: OutlinkComponent;
  let fixture: ComponentFixture<OutlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
