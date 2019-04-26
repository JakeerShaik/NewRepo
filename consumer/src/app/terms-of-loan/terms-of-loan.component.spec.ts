import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfLoanComponent } from './terms-of-loan.component';

describe('TermsOfLoanComponent', () => {
  let component: TermsOfLoanComponent;
  let fixture: ComponentFixture<TermsOfLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
