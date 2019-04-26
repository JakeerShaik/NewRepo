import { TestBed, inject } from '@angular/core/testing';

import { PersonalDetailService } from './personal-detail.service';

describe('PersonalDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalDetailService]
    });
  });

  it('should be created', inject([PersonalDetailService], (service: PersonalDetailService) => {
    expect(service).toBeTruthy();
  }));
});
