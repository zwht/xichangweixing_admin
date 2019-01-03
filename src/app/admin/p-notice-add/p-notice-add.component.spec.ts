import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PNoticeAddComponent } from './p-notice-add.component';

describe('PNoticeAddComponent', () => {
  let component: PNoticeAddComponent;
  let fixture: ComponentFixture<PNoticeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PNoticeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PNoticeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
