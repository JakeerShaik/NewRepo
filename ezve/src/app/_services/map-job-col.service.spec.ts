import { TestBed, inject } from '@angular/core/testing';

import { MapJobColService } from './map-job-col.service';

describe('MapJobColService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapJobColService]
    });
  });

  it('should be created', inject([MapJobColService], (service: MapJobColService) => {
    expect(service).toBeTruthy();
  }));
});
