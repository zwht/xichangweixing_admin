import { TestBed, inject } from '@angular/core/testing';

import { QualityEventService } from './quality-event.service';

describe('QualityEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualityEventService]
    });
  });

  it('should be created', inject([QualityEventService], (service: QualityEventService) => {
    expect(service).toBeTruthy();
  }));
});
