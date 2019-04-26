import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingLoanAppComponent } from './existing-loan-app.component';

describe('ExistingLoanAppComponent', () => {
  let component: ExistingLoanAppComponent;
  let fixture: ComponentFixture<ExistingLoanAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingLoanAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingLoanAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
