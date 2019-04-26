import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmountComponent } from './loan-amount.component';

describe('LoanAmountComponent', () => {
  let component: LoanAmountComponent;
  let fixture: ComponentFixture<LoanAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
