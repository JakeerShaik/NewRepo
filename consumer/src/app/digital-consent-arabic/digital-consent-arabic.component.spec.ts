import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalConsentArabicComponent } from './digital-consent-arabic.component';

describe('DigitalConsentArabicComponent', () => {
  let component: DigitalConsentArabicComponent;
  let fixture: ComponentFixture<DigitalConsentArabicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalConsentArabicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalConsentArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
