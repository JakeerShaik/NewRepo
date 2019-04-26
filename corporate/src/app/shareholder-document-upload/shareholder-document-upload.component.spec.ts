import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholderDocumentUploadComponent } from './shareholder-document-upload.component';

describe('ShareholderDocumentUploadComponent', () => {
  let component: ShareholderDocumentUploadComponent;
  let fixture: ComponentFixture<ShareholderDocumentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholderDocumentUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholderDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
