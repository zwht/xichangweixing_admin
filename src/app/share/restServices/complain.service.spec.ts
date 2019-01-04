import { TestBed, inject } from '@angular/core/testing';

import { ComplainService } from './complain.service';

describe('ComplainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplainService]
    });
  });

  it('should be created', inject([ComplainService], (service: ComplainService) => {
    expect(service).toBeTruthy();
  }));
});
