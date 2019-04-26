import { TestBed, inject } from '@angular/core/testing';

import { AppoinmentService } from './appoinment.service';

describe('AppoinmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppoinmentService]
    });
  });

  it('should be created', inject([AppoinmentService], (service: AppoinmentService) => {
    expect(service).toBeTruthy();
  }));
});
