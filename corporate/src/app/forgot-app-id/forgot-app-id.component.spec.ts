import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotAppIDComponent } from './forgot-app-id.component';

describe('ForgotAppIDComponent', () => {
  let component: ForgotAppIDComponent;
  let fixture: ComponentFixture<ForgotAppIDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotAppIDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotAppIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
