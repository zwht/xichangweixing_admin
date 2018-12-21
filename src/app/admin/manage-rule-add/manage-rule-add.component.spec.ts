import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRuleAddComponent } from './manage-rule-add.component';

describe('ManageRuleAddComponent', () => {
  let component: ManageRuleAddComponent;
  let fixture: ComponentFixture<ManageRuleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRuleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRuleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
