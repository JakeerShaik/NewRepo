import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDocMapComponent } from './job-doc-map.component';

describe('JobDocMapComponent', () => {
  let component: JobDocMapComponent;
  let fixture: ComponentFixture<JobDocMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDocMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDocMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
