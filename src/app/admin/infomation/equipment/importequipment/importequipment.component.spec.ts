import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportequipmentComponent } from './importequipment.component';

describe('ImportequipmentComponent', () => {
  let component: ImportequipmentComponent;
  let fixture: ComponentFixture<ImportequipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportequipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
