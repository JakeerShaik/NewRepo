import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAndconditionArabicComponent } from './term-andcondition-arabic.component';

describe('TermAndconditionArabicComponent', () => {
  let component: TermAndconditionArabicComponent;
  let fixture: ComponentFixture<TermAndconditionArabicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermAndconditionArabicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermAndconditionArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
