import { TestBed, inject } from '@angular/core/testing';

import { AddAgentService } from './add-agent.service';

describe('AddAgentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAgentService]
    });
  });

  it('should be created', inject([AddAgentService], (service: AddAgentService) => {
    expect(service).toBeTruthy();
  }));
});
