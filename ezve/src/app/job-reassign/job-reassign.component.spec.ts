import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReassignComponent } from './job-reassign.component';

describe('JobReassignComponent', () => {
  let component: JobReassignComponent;
  let fixture: ComponentFixture<JobReassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobReassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
