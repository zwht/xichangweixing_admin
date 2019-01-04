import { TestBed, inject } from '@angular/core/testing';

import { OutlinkService } from './outlink.service';

describe('OutlinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutlinkService]
    });
  });

  it('should be created', inject([OutlinkService], (service: OutlinkService) => {
    expect(service).toBeTruthy();
  }));
});
