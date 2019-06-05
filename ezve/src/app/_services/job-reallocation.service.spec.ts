import { TestBed } from '@angular/core/testing';

import { JobReallocationService } from './job-reallocation.service';

describe('JobReallocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobReallocationService = TestBed.get(JobReallocationService);
    expect(service).toBeTruthy();
  });
});
