import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyappIdComponent } from './view-myapp-id.component';

describe('ViewMyappIdComponent', () => {
  let component: ViewMyappIdComponent;
  let fixture: ComponentFixture<ViewMyappIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyappIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyappIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
