import { TestBed, inject } from '@angular/core/testing';

import { SupplierService } from './supplier.service';
import { HttpClient } from '@angular/common/http';
import { ShareModule } from '../share.module';

describe('SupplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierService, HttpClient],
      imports: [
        ShareModule
      ]
    });
  });

  it('should be created', inject([SupplierService], (service: SupplierService) => {
    expect(service).toBeTruthy();
  }));
});
