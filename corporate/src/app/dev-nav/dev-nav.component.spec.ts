import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevNavComponent } from './dev-nav.component';

describe('DevNavComponent', () => {
  let component: DevNavComponent;
  let fixture: ComponentFixture<DevNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
