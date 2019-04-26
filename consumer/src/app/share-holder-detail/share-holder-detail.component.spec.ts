import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareHolderDetailComponent } from './share-holder-detail.component';

describe('ShareHolderDetailComponent', () => {
  let component: ShareHolderDetailComponent;
  let fixture: ComponentFixture<ShareHolderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareHolderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareHolderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
