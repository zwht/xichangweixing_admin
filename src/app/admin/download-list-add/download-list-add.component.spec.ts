import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadListAddComponent } from './download-list-add.component';

describe('DownloadListAddComponent', () => {
  let component: DownloadListAddComponent;
  let fixture: ComponentFixture<DownloadListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
