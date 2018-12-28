import { TestBed, inject } from '@angular/core/testing';

import { AdminDivisionService } from './admin-division.service';
import { HttpClient } from '@angular/common/http';
import { ShareModule } from '../share.module';

describe('AdminDivisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminDivisionService, HttpClient],
      imports: [
        ShareModule
      ]
    });
  });

  it('should be created', inject([AdminDivisionService], (service: AdminDivisionService) => {
    expect(service).toBeTruthy();
  }));
});
