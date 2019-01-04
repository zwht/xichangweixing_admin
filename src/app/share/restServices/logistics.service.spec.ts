import { TestBed, inject } from '@angular/core/testing';

import { LogisticsService } from './logistics.service';

describe('LogisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogisticsService]
    });
  });

  it('should be created', inject([LogisticsService], (service: LogisticsService) => {
    expect(service).toBeTruthy();
  }));
});
