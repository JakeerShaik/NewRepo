import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLabelComponent } from './sidebar-label.component';

describe('SidebarLabelComponent', () => {
  let component: SidebarLabelComponent;
  let fixture: ComponentFixture<SidebarLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
