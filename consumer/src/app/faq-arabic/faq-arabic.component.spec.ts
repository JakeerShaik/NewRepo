import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqArabicComponent } from './faq-arabic.component';

describe('FaqArabicComponent', () => {
  let component: FaqArabicComponent;
  let fixture: ComponentFixture<FaqArabicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqArabicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
