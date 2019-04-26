import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCompanyAddressComponent } from './parent-company-address.component';

describe('ParentCompanyAddressComponent', () => {
  let component: ParentCompanyAddressComponent;
  let fixture: ComponentFixture<ParentCompanyAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentCompanyAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentCompanyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
