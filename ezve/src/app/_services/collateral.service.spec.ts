import { TestBed, inject } from '@angular/core/testing';

import { CollateralService } from './collateral.service';

describe('CollateralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollateralService]
    });
  });

  it('should be created', inject([CollateralService], (service: CollateralService) => {
    expect(service).toBeTruthy();
  }));
});
