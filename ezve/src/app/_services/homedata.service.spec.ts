import { TestBed } from '@angular/core/testing';

import { HomedataService } from './homedata.service';

describe('HomedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomedataService = TestBed.get(HomedataService);
    expect(service).toBeTruthy();
  });
});
