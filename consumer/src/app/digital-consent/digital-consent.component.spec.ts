import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalConsentComponent } from './digital-consent.component';

describe('DigitalConsentComponent', () => {
  let component: DigitalConsentComponent;
  let fixture: ComponentFixture<DigitalConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
