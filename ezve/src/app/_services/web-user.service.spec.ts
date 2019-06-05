import { TestBed, inject } from '@angular/core/testing';

import { WebUserService } from './web-user.service';

describe('WebUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebUserService]
    });
  });

  it('should be created', inject([WebUserService], (service: WebUserService) => {
    expect(service).toBeTruthy();
  }));
});
