import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingJobComponent } from './outstanding-job.component';

describe('OutstandingJobComponent', () => {
  let component: OutstandingJobComponent;
  let fixture: ComponentFixture<OutstandingJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
