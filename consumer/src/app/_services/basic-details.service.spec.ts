import { TestBed, inject } from '@angular/core/testing';

import { BasicDetailsService } from './basic-details.service';

describe('BasicDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicDetailsService]
    });
  });

  it('should be created', inject([BasicDetailsService], (service: BasicDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
