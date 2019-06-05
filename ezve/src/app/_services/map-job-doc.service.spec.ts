import { TestBed, inject } from '@angular/core/testing';

import { MapJobDocService } from './map-job-doc.service';

describe('MapJobDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapJobDocService]
    });
  });

  it('should be created', inject([MapJobDocService], (service: MapJobDocService) => {
    expect(service).toBeTruthy();
  }));
});
