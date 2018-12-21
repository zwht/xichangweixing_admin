import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRuleComponent } from './manage-rule.component';

describe('ManageRuleComponent', () => {
  let component: ManageRuleComponent;
  let fixture: ComponentFixture<ManageRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
