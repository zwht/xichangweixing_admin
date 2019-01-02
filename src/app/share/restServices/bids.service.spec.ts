import { TestBed, inject } from '@angular/core/testing';

import { BidsService } from './bids.service';
import { HttpClient } from '@angular/common/http';
import { ShareModule } from '../share.module';

describe('BidsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BidsService, HttpClient],
      imports: [
        ShareModule
      ]
    });
  });

  it('should be created', inject([BidsService], (service: BidsService) => {
    expect(service).toBeTruthy();
  }));
});
