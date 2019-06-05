import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReallocationComponent } from './job-reallocation.component';

describe('JobReallocationComponent', () => {
  let component: JobReallocationComponent;
  let fixture: ComponentFixture<JobReallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobReallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
