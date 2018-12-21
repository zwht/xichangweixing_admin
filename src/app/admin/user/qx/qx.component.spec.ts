import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QxComponent } from './qx.component';

describe('QxComponent', () => {
  let component: QxComponent;
  let fixture: ComponentFixture<QxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
