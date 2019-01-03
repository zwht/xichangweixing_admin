import { TestBed, inject } from '@angular/core/testing';

import { QualityNoticeService } from './quality-notice.service';

describe('QualityNoticeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualityNoticeService]
    });
  });

  it('should be created', inject([QualityNoticeService], (service: QualityNoticeService) => {
    expect(service).toBeTruthy();
  }));
});
