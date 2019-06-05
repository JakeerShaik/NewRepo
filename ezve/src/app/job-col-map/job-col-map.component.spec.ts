import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobColMapComponent } from './job-col-map.component';

describe('JobColMapComponent', () => {
  let component: JobColMapComponent;
  let fixture: ComponentFixture<JobColMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobColMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobColMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
