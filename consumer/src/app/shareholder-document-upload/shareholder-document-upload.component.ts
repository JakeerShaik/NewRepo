import { FileUploadService } from './../_services/file-upload.service';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shareholder-document-upload',
  templateUrl: './shareholder-document-upload.component.html',
  styleUrls: ['./shareholder-document-upload.component.css']
})
export class ShareholderDocumentUploadComponent {
  form: FormGroup;
  selectedFile: File;
  emiratesid: boolean = false;
  pass: boolean = false;
  visa: boolean = false;
  isSubmitted: boolean = false;

  constructor(private router: Router, private frmBuilder: FormBuilder, private fb: FormBuilder,
    private http: HttpClient, private alert: AlertService, private fileupload: FileUploadService) {
  }
  ngOnInit() {

    this.form = this.frmBuilder.group({
      eid: ["", Validators.compose([Validators.required])],
      passport: ["", Validators.compose([Validators.required])],
      visanum: [""],

    });

    this.getuploadedFile();
  }

  get eid() { return this.form.get('eid'); }
  get passport() { return this.form.get('passport'); }
  get visanum() { return this.form.get('visanum'); }


  nextForm() {
    this.isSubmitted = true;
    if (!this.form.valid)
      return;
    this.router.navigate(["/personal-detail"]);

  }

  onFileChanged(event, filecat) {
    this.alert.removeAlert();

    this.selectedFile = event.target.files[0];
    // console.log(event);
    let ext: any = this.selectedFile.name.split('.').pop();

    if (ext != "pdf" && ext != "png" && ext != "jpg" && ext != "jpeg" && ext != "PDF" && ext != "PNG" && ext != "JPG" && ext != "JPEG") {
      this.alert.error("Upload Image (JPEG, JPG, PNG) and PDF only")
      return;
    }
    if (this.selectedFile.size > 10485760) {
      this.alert.error("File is More than 10 MB")
      return;
    }

    // console.log(this.selectedFile.size);
    // console.log(this.selectedFile.name.split('.').pop());
    this.onUpload(filecat);
  }
  onUpload(filecat: string) {
    this.alert.removeAlert();
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.tokenKey;
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);
    uploadData.append("fileCategory", filecat);
    uploadData.append('authToken', token);
    this.http.post('/ezverify/processdocument', uploadData)
      .subscribe(data => {
     
        // console.log(filecat);
        // console.log(data);
        if (filecat == "EmiratesId") {
          this.emiratesid = true;
          localStorage.setItem('eid', JSON.stringify(data));

        } else if (filecat == "Passport") {
          this.pass = true;
          localStorage.setItem('pass', JSON.stringify(data));

        }
        else {
          this.visa = true;
          localStorage.setItem('visa', JSON.stringify(data));
        }
      },
        error => {
          if (filecat == "EmiratesId") {
            this.form.controls['eid'].reset();
          } else if (filecat == "Passport") {
            this.form.controls['passport'].reset();

          }
          this.alert.error("Document Not Uploaded Please try again")
          // console.log(error);
        });
  }


  getuploadedFile() {
    this.fileupload.UploadedFileDetail().subscribe(
      data => {
        const eidno = this.form.get('eid');
        const passportno = this.form.get('passport');
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
         // console.log(data[i].fileCategory)
          if (data[i].fileCategory == "EmiratesId") {
            this.emiratesid = true;
            eidno.clearValidators();
  
            
          } else if (data[i].fileCategory == "Passport") {
            this.pass = true;
            passportno.clearValidators();

          }
          else if (data[i].fileCategory == "visa") {
            this.visa = true;

          }
        }

        eidno.updateValueAndValidity();
        passportno.updateValueAndValidity();
      }
    )
  }


}
