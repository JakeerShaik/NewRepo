import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredOfficeAddressComponent } from './registered-office-address.component';

describe('RegisteredOfficeAddressComponent', () => {
  let component: RegisteredOfficeAddressComponent;
  let fixture: ComponentFixture<RegisteredOfficeAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredOfficeAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredOfficeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
