import { TestBed, inject } from '@angular/core/testing';

import { QualityDealService } from './quality-deal.service';

describe('QualityDealService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualityDealService]
    });
  });

  it('should be created', inject([QualityDealService], (service: QualityDealService) => {
    expect(service).toBeTruthy();
  }));
});
