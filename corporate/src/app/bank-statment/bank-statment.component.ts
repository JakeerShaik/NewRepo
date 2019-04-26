import { Statment } from './statment';
import { FileUploadService } from './../_services/file-upload.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AlertService } from './../_services/alert.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-bank-statment',
  templateUrl: './bank-statment.component.html',
  styleUrls: ['./bank-statment.component.css']
})
export class BankStatmentComponent implements OnInit {
  bank_statment: FormGroup;
  isSubmitted: boolean = false;
  selectedFile: File;
  appId: string = null;
  yea1: boolean = false;
  yea2: boolean = false;
  yea3: boolean = false;

  mnOne: boolean = false;
  mnTwo: boolean = false;
  mnThree: boolean = false;
  mnFour: boolean = false;
  mnFive: boolean = false;
  mnSix: boolean = false;
  mnSeven: boolean = false;
  mnEight: boolean = false;
  mnNine: boolean = false;
  mnTen: boolean = false;
  mnEleven: boolean = false;
  mnTwelve: boolean = false;

  inho: boolean = false;

  allData = [];
  bankStat = [];
  auditDoc = [];
  constructor(private http: HttpClient, private alert: AlertService,
    private router: Router, private frmBuilder: FormBuilder, private fileUpload: FileUploadService) { }

  ngOnInit() {
    this.bank_statment = this.frmBuilder.group({

      monthOne: ["", [Validators.required]],
      monthTwo: ["", [Validators.required]],
      monthThree: ["", [Validators.required]],
      monthFour: ["", [Validators.required]],
      monthFive: ["", [Validators.required]],
      monthSix: ["", [Validators.required]],
      monthSeven: ["", [Validators.required]],
      monthEight: ["", [Validators.required]],
      monthNine: ["", [Validators.required]],
      monthTen: ["", [Validators.required]],
      monthEleven: ["", [Validators.required]],
      monthTwelve: ["", [Validators.required]],
      yearOne: ["", [Validators.required]],
      yearTwo: ["", [Validators.required]],
      yearThree: ["", [Validators.required]],
      inhouse: ["", [Validators.required]],
    });

    this.appId = JSON.parse(localStorage.getItem("CurrApp"));
    this.allUploadedData();

  }

  get monthOne() { return this.bank_statment.get('monthOne'); }
  get monthTwo() { return this.bank_statment.get('monthTwo'); }
  get monthThree() { return this.bank_statment.get('monthThree'); }
  get monthFour() { return this.bank_statment.get('monthFour'); }
  get monthFive() { return this.bank_statment.get('monthFive'); }
  get monthSix() { return this.bank_statment.get('monthSix'); }
  get monthSeven() { return this.bank_statment.get('monthSeven'); }
  get monthEight() { return this.bank_statment.get('monthEight'); }
  get monthNine() { return this.bank_statment.get('monthNine'); }
  get monthTen() { return this.bank_statment.get('monthTen'); }
  get monthEleven() { return this.bank_statment.get('monthEleven'); }
  get monthTwelve() { return this.bank_statment.get('monthTwelve'); }
  get yearOne() { return this.bank_statment.get('yearOne'); }
  get yearTwo() { return this.bank_statment.get('yearTwo'); }
  get yearThree() { return this.bank_statment.get('yearThree'); }
  get inhouse() { return this.bank_statment.get('inhouse'); }






  // File Upload

  onFileChanged(event, type: string, index: string) {
    this.alert.removeAlert();
    let url = "";
    if (type == "bankStatement") {
      url = "bankstatement";
    }
    else if (type == "auditForm") {
      url = "auditform";
    }
    else if (type == "inhouseAuditForm") {
      url = "inhouseauditform";
    }
    // else if (type == "") {
    //   url = ""
    // }
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
    this.onUpload(type, url, index);
  }
  onUpload(type: string, url: string, index: string) {
    this.alert.removeAlert();
    const uploadData = new FormData();
    uploadData.append(type, this.selectedFile);
    uploadData.append("applicationId", this.appId);
    uploadData.append("index", index);
    this.http.post('/' + url, uploadData)
      .subscribe(data => {
        // console.log(data);
        this.allUploadedData();
      },
        error => {

          this.alert.error("Document Not Uploaded Please try again")
          // console.log(error);
        });
  }

  // End of file Upload


  allUploadedData() {
    this.fileUpload.AllUploadedFile(this.appId).
      subscribe(data => {
        // console.log(data);
        this.allData = data;
        if (data.auditDocs.length > 0) {
          if (data.auditDocs[0].auditDocLocation) {
            this.yea1 = true;
            this.yearOne.clearValidators();
            this.yearOne.updateValueAndValidity();
          }
          if (data.auditDocs[1].auditDocLocation) {
            this.yea2 = true;
            this.yearTwo.clearValidators();
            this.yearTwo.updateValueAndValidity();
          }
          if (data.auditDocs[2].auditDocLocation) {
            this.yea3 = true;
            this.yearThree.clearValidators();
            this.yearThree.updateValueAndValidity();
          }
          if (data.basicDocs.inhouseAudits) {
            this.inho = true;
            this.inhouse.clearValidators();
            this.inhouse.updateValueAndValidity();
          }
        }
        // /Monthly Statment///
        if (data.bankStatementDocs.length > 0) {
          if (data.bankStatementDocs[0].bankStatementLocation) {
            this.mnOne = true;
            this.monthOne.clearValidators();
            this.monthOne.updateValueAndValidity();
          }
          if (data.bankStatementDocs[1].bankStatementLocation) {
            this.mnTwo = true;
            this.monthTwo.clearValidators();
            this.monthTwo.updateValueAndValidity();
          }
          if (data.bankStatementDocs[2].bankStatementLocation) {
            this.mnThree = true;
            this.monthThree.clearValidators();
            this.monthThree.updateValueAndValidity();
          }
          if (data.bankStatementDocs[3].bankStatementLocation) {
            this.mnFour = true;
            this.monthFour.clearValidators();
            this.monthFour.updateValueAndValidity();
          }
          if (data.bankStatementDocs[4].bankStatementLocation) {
            this.mnFive = true;
            this.monthFive.clearValidators();
            this.monthFive.updateValueAndValidity();
          }
          if (data.bankStatementDocs[5].bankStatementLocation) {
            this.mnSix = true;
            this.monthSix.clearValidators();
            this.monthSix.updateValueAndValidity();
          }
          if (data.bankStatementDocs[6].bankStatementLocation) {
            this.mnSeven = true;
            this.monthSeven.clearValidators();
            this.monthSeven.updateValueAndValidity();
          }
          if (data.bankStatementDocs[7].bankStatementLocation) {
            this.mnEight = true;
            this.monthEight.clearValidators();
            this.monthEight.updateValueAndValidity();
          }
          if (data.bankStatementDocs[8].bankStatementLocation) {
            this.mnNine = true;
            this.monthNine.clearValidators();
            this.monthNine.updateValueAndValidity();
          }
          if (data.bankStatementDocs[9].bankStatementLocation) {
            this.mnTen = true;
            this.monthTen.clearValidators();
            this.monthTen.updateValueAndValidity();
          }
          if (data.bankStatementDocs[10].bankStatementLocation) {
            this.mnEleven = true;
            this.monthEleven.clearValidators();
            this.monthEleven.updateValueAndValidity();
          }
          if (data.bankStatementDocs[11].bankStatementLocation) {
            this.mnTwelve = true;
            this.monthTwelve.clearValidators();
            this.monthTwelve.updateValueAndValidity();
          }
        }
      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          //  console.log(error.error.statusDetails.statusMessage)
        })
  }



  saveData() {
    this.isSubmitted = true;
    if (!this.bank_statment.valid)
      return;

    this.fileUpload.AllUploadedFile(this.appId).
      subscribe(data => {
        // console.log(data);
        this.bankStat = [];
        for (let index = 0; index < 12; index++) {
          this.bankStat.push(data.bankStatementDocs[index].bankStatementOrgFileName)

        }

        this.auditDoc = [];
        for (let i = 0; i < 3; i++) {
          this.auditDoc.push(data.auditDocs[i].auditDocOrgFileName)

        }
        let alldata: Statment = {
          applicationId: JSON.parse(localStorage.getItem("CurrApp")),
          inhouseFinancials: data.basicDocs.inhouseAuditsOrgFileName,
          bankStatements: this.bankStat,
          auditedFinancials: this.auditDoc

        }

        this.fileUpload.submitBankStatment(alldata).
          subscribe(response => {
            // console.log(response);
            //Redirect To another Page
            this.router.navigate(['/company-detail']);
          },
            error => {
              this.alert.error(error.error.message);
              console.log(error.error.message)
            })


      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          console.log(error.error.statusDetails.statusMessage)
        })
  }



}
