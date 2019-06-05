import { TestBed, inject } from '@angular/core/testing';

import { OutstandingjobService } from './outstandingjob.service';

describe('OutstandingjobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutstandingjobService]
    });
  });

  it('should be created', inject([OutstandingjobService], (service: OutstandingjobService) => {
    expect(service).toBeTruthy();
  }));
});
