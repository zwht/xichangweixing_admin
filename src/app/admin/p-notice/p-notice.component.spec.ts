import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PNoticeComponent } from './p-notice.component';

describe('PNoticeComponent', () => {
  let component: PNoticeComponent;
  let fixture: ComponentFixture<PNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
