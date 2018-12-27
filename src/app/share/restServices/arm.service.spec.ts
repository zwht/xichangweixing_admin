import { TestBed, inject } from '@angular/core/testing';

import { ArmService } from './arm.service';

describe('ArmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArmService]
    });
  });

  it('should be created', inject([ArmService], (service: ArmService) => {
    expect(service).toBeTruthy();
  }));
});
