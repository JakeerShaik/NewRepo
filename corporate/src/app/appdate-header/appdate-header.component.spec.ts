import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppdateHeaderComponent } from './appdate-header.component';

describe('AppdateHeaderComponent', () => {
  let component: AppdateHeaderComponent;
  let fixture: ComponentFixture<AppdateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppdateHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppdateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
