import { TestBed, inject } from '@angular/core/testing';

import { SupplierTypeService } from './supplier-type.service';
import { HttpClient } from '@angular/common/http';
import { ShareModule } from '../share.module';

describe('SupplierTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierTypeService, HttpClient],
      imports: [
        ShareModule
      ]
    });
  });

  it('should be created', inject([SupplierTypeService], (service: SupplierTypeService) => {
    expect(service).toBeTruthy();
  }));
});
