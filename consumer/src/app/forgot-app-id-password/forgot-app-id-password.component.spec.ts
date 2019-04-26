import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotAppIdPasswordComponent } from './forgot-app-id-password.component';

describe('ForgotAppIdPasswordComponent', () => {
  let component: ForgotAppIdPasswordComponent;
  let fixture: ComponentFixture<ForgotAppIdPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotAppIdPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotAppIdPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
