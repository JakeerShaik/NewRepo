import { TestBed, inject } from '@angular/core/testing';

import { ProductWithQuotationService } from './product-with-quotation.service';

describe('ProductWithQuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductWithQuotationService]
    });
  });

  it('should be created', inject([ProductWithQuotationService], (service: ProductWithQuotationService) => {
    expect(service).toBeTruthy();
  }));
});
