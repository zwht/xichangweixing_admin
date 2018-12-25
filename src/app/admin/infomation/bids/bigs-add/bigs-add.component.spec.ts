import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigsAddComponent } from './bigs-add.component';

describe('BigsAddComponent', () => {
  let component: BigsAddComponent;
  let fixture: ComponentFixture<BigsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
