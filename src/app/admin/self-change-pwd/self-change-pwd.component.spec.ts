import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfChangePwdComponent } from './self-change-pwd.component';

describe('SelfChangePwdComponent', () => {
  let component: SelfChangePwdComponent;
  let fixture: ComponentFixture<SelfChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfChangePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
