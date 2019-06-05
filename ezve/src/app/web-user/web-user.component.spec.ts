import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUserComponent } from './web-user.component';

describe('WebUserComponent', () => {
  let component: WebUserComponent;
  let fixture: ComponentFixture<WebUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
