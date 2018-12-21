import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlinkAddComponent } from './outlink-add.component';

describe('OutlinkAddComponent', () => {
  let component: OutlinkAddComponent;
  let fixture: ComponentFixture<OutlinkAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutlinkAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlinkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
