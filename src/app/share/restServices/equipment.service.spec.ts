import { TestBed, inject } from '@angular/core/testing';

import { EquipmentService } from './equipment.service';
import { HttpClient } from '@angular/common/http';
import { ShareModule } from '../share.module';

describe('EquipmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentService, HttpClient],
      imports: [
        ShareModule
      ]
    });
  });

  it('should be created', inject([EquipmentService], (service: EquipmentService) => {
    expect(service).toBeTruthy();
  }));
});
