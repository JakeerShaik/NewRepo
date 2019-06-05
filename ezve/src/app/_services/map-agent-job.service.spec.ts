import { TestBed, inject } from '@angular/core/testing';

import { MapAgentJobService } from './map-agent-job.service';

describe('MapAgentJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapAgentJobService]
    });
  });

  it('should be created', inject([MapAgentJobService], (service: MapAgentJobService) => {
    expect(service).toBeTruthy();
  }));
});
