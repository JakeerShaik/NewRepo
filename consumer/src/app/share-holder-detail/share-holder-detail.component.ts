import { AlertService } from './../_services/alert.service';
import { PersonalDetailService } from './../_services/personal-detail.service';
import { DropDownService } from './../_services/drop-down.service';
import { Component, NgModule, VERSION, ViewChild, ViewContainerRef, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { LoanService } from './../_services/loan.service';
import { formatDate } from '@angular/common';
import { skipUntil } from 'rxjs/operators';


@Component({
  selector: 'app-share-holder-detail',
  templateUrl: './share-holder-detail.component.html',
  styleUrls: ['./share-holder-detail.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class ShareHolderDetailComponent implements OnInit, AfterViewInit {
  Personal_detail: FormGroup;
  isSubmitted: boolean = false;
  countryList = [];
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";
  formdata: any = null;
  ocrValue:any=null
  month: any;
  day: any;
  year: any;
  public min: any = null;
  public max: any = null;
  public maxdate: any = null;

  today = new Date();
  jstoday: any;
  constructor(private dropDown: DropDownService, private router: Router, private loan: LoanService,
    private frmBuilder: FormBuilder, private http: HttpClient, private personalService: PersonalDetailService, private alertservice: AlertService) {

    this.jstoday = formatDate(this.today, 'dd', 'en-US');
  }

  ngAfterViewInit() {
    this.formControlValueChanged();
    // console.log("view")

    this.allFormData();

  }
  ngOnInit() {
    this.Personal_detail = this.frmBuilder.group({
      title: ["", [Validators.required]],
      firstName: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')])],
      middleName: ["", Validators.compose([Validators.required])],
      lastName: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')])],
      gender: ["", [Validators.required]],
      email: [" ", Validators.compose([])],
      dob: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      mobile: ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^0[0-9].*$")])],
      maritalStatus: ["", Validators.compose([Validators.required])],
      emiratesId: ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(20)])],
      eidExpDate: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      nationality: ["", Validators.compose([Validators.required])],
      passportNum: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      passportExpDate: ["", Validators.compose([Validators.required])],
      visaId: ["", Validators.compose([Validators.minLength(3), Validators.maxLength(50)])],
      visaExpDate: ["", Validators.compose([])],
      uaeResidentialAddress: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
    });

    this.AllCountry();
    this.formdata = JSON.parse(localStorage.getItem('allFormdata'));
    this.ocrData();

    // this.setDate();
    this.mnamechange();
    this.year = this.today.getFullYear()
    this.month = this.today.getMonth() + 1

    this.min = new Date(this.year, this.month - 1, this.jstoday, 10, 30);
    this.maxdate = new Date(this.year - 120, this.month - 1, this.jstoday, 10, 30);
    this.max = new Date(this.year - 22, this.month - 1, this.jstoday, 10, 30);
  }

  get title() { return this.Personal_detail.get('title'); }
  get firstName() { return this.Personal_detail.get('firstName'); }
  get middleName() { return this.Personal_detail.get('middleName'); }
  get lastName() { return this.Personal_detail.get('lastName'); }
  get gender() { return this.Personal_detail.get('gender'); }
  get email() { return this.Personal_detail.get('email'); }
  get dob() { return this.Personal_detail.get('dob'); }
  get mobile() { return this.Personal_detail.get('mobile'); }
  get maritalStatus() { return this.Personal_detail.get('maritalStatus'); }
  get emiratesId() { return this.Personal_detail.get('emiratesId'); }
  get eidExpDate() { return this.Personal_detail.get('eidExpDate'); }
  get passportNum() { return this.Personal_detail.get('passportNum'); }
  get passportExpDate() { return this.Personal_detail.get('passportExpDate'); }
  get nationality() { return this.Personal_detail.get('nationality'); }
  get visaId() { return this.Personal_detail.get('visaId'); }
  get visaExpDate() { return this.Personal_detail.get('visaExpDate'); }
  get uaeResidentialAddress() { return this.Personal_detail.get('uaeResidentialAddress'); }

  mnamechange() {
    const mname = this.Personal_detail.get('middleName');
    const emailid = this.Personal_detail.get('email');
    this.Personal_detail.valueChanges.subscribe(
      (mode: string) => {
        mname.setValidators([Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]);
        emailid.clearValidators();
        mname.updateValueAndValidity();
        emailid.updateValueAndValidity();
      });
  }

  formControlValueChanged() {

    const visaNumber = this.Personal_detail.get('visaId');
    const visaexp = this.Personal_detail.get('visaExpDate');
    // const mname = this.Personal_detail.get('middleName');

    this.Personal_detail.get('nationality').valueChanges.subscribe(
      (mode: string) => {
        //alert("changed");
        //  console.log(mode);
        if (mode !== 'ARE') {
          // passportNumber.setValidators([Validators.required]);
          // passportexp.setValidators([Validators.required]);
          visaNumber.setValidators([Validators.required]);
          visaexp.setValidators([Validators.required]);
        }
        else {
          // passportNumber.clearValidators();
          // passportexp.clearValidators();
          visaNumber.clearValidators();
          visaexp.clearValidators();
          // mname.clearValidators();
        }
        // passportNumber.updateValueAndValidity();
        // passportexp.updateValueAndValidity();
        visaNumber.updateValueAndValidity();
        visaexp.updateValueAndValidity();
        // mname.updateValueAndValidity();

      });
  }

  personalDatasave(evnt) {
    this.isSubmitted = true;
    if (!this.Personal_detail.valid)
      return;
    // console.log(this.Personal_detail.value);
    this.personalService.personalDataSave(this.Personal_detail.value).
      subscribe(data => {
        if (evnt == 'cont') {
          this.allLoanDetail();
        } else {
          this.router.navigate(["/home"]);
        }
      },
        error => {
          // console.log(error.error.message);
          this.alertservice.error(error.error.message);
          window.scroll(0, 0);
        })
  }


  AllCountry() {
    this.dropDown.CountryList().
      subscribe(country => {
        //  console.log(country);
        this.countryList = country;
        // this.countryList
      },
        error => {

          // console.log(error);
        })
  }


  ocrData() {
    let token = JSON.parse(localStorage.getItem('currentUser'))
    this.personalService.applicantPersonalDetails(token.tokenKey).
      subscribe(data => {
        this.ocrValue=data
        console.log(this.ocrValue)
         this.Personal_detail.get('title').setValue(this.ocrValue.title);
         this.Personal_detail.get('firstName').setValue(this.ocrValue.firstName);
         this.Personal_detail.get('middleName').setValue(this.ocrValue.middleName);
         this.Personal_detail.get('lastName').setValue(this.ocrValue.lastName);
         this.Personal_detail.get('gender').setValue(this.ocrValue.gender);
         this.Personal_detail.get('email').setValue(this.ocrValue.email);
         this.Personal_detail.get('dob').setValue(this.ocrValue.dob);
         this.Personal_detail.get('mobile').setValue(this.ocrValue.mobile);
         this.Personal_detail.get('maritalStatus').setValue(this.ocrValue.maritalStatus);
         this.Personal_detail.get('emiratesId').setValue(this.ocrValue.emiratesId);
         this.Personal_detail.get('eidExpDate').setValue(this.ocrValue.eidExpDate);
         this.Personal_detail.get('passportNum').setValue(this.ocrValue.passportNum);
         this.Personal_detail.get('passportExpDate').setValue(this.ocrValue.passportExpDate);
         this.Personal_detail.get('nationality').setValue(this.ocrValue.nationality);
         this.Personal_detail.get('visaId').setValue(this.ocrValue.visaId);
         this.Personal_detail.get('visaExpDate').setValue(this.ocrValue.visaExpDate);
         this.Personal_detail.get('uaeResidentialAddress').setValue(this.ocrValue.uaeResidentialAddress);

      },
        error => {

          console.log(error);
        })
  }


  allFormData() {
    if (this.formdata) {
      if (this.formdata.kyc.status==1) {

        // console.log(this.formdata.kyc)
        this.Personal_detail.get('title').setValue(this.formdata.kyc.title);
        this.Personal_detail.get('firstName').setValue(this.formdata.kyc.firstName);
        this.Personal_detail.get('middleName').setValue(this.formdata.kyc.middleName);
        this.Personal_detail.get('lastName').setValue(this.formdata.kyc.lastName);
        this.Personal_detail.get('gender').setValue(this.formdata.kyc.gender);
        this.Personal_detail.get('email').setValue(this.formdata.kyc.email);
        this.Personal_detail.get('dob').setValue(this.formdata.kyc.dob);
        this.Personal_detail.get('mobile').setValue(this.formdata.kyc.mobile);
        this.Personal_detail.get('maritalStatus').setValue(this.formdata.kyc.maritalStatus);
        this.Personal_detail.get('emiratesId').setValue(this.formdata.kyc.emiratesId);
        this.Personal_detail.get('eidExpDate').setValue(this.formdata.kyc.eidExpDate);
        this.Personal_detail.get('passportNum').setValue(this.formdata.kyc.passportNum);
        this.Personal_detail.get('passportExpDate').setValue(this.formdata.kyc.passportExpDate);
        this.Personal_detail.get('nationality').setValue(this.formdata.kyc.nationality);
        this.Personal_detail.get('visaId').setValue(this.formdata.kyc.visaId);
        this.Personal_detail.get('visaExpDate').setValue(this.formdata.kyc.visaExpDate);
        this.Personal_detail.get('uaeResidentialAddress').setValue(this.formdata.kyc.uaeResidentialAddress);
      }
     
    }
    
  }

  allLoanDetail() {
    this.loan.loanDetail().
      subscribe(data => {
        console.log(data);
        localStorage.setItem('allFormdata', JSON.stringify(data));

        this.router.navigate(["/registered-address"]);

      },
        error => {


        })

  }

}
