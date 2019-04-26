import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankStatmentComponent } from './bank-statment.component';

describe('BankStatmentComponent', () => {
  let component: BankStatmentComponent;
  let fixture: ComponentFixture<BankStatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankStatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankStatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
