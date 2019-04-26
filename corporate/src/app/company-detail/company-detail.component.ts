import { BasicDetailsService } from './../_services/basic-details.service';
import { AlertService } from './../_services/alert.service';
import { DropDownService } from './../_services/drop-down.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company_detail: FormGroup;
  isSubmitted: boolean = false;
  country = [];
  business = [];
  nature = [];
  emiratecity = [];

  month: any;
  year: any;
  public min: any = null;
  public max: any = null;
  public maxdate: any = null;
  today = new Date();
  jstoday: any;

  constructor(private router: Router, private frmBuilder: FormBuilder, private dropdown: DropDownService, private alert: AlertService, private basic: BasicDetailsService) {
    this.jstoday = formatDate(this.today, 'dd', 'en-US');

  }

  ngOnInit() {

    this.company_detail = this.frmBuilder.group({

      companyRegistrationDate: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      tradeLicenseNumber: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      tradeLicenseExpirydate: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      placeofIssue: ["", [Validators.required]],
      countryOfDomicile: ["", [Validators.minLength(1), Validators.maxLength(50)]],
      yearsInBuisness: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      noOfEmployees: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern("^[1-9][0-9]*$")]],
      companyWebSite: ["", [Validators.minLength(3), Validators.maxLength(100)]],
      legalStatus: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      parentCompanyApplicable: ["", [Validators.minLength(3), Validators.maxLength(100)]],
      nob: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      tob: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      applicationId: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(20)]],

    });
    this.countryList();
    this.TypeOfBusiness();
    this.NatureOfBusiness();
    this.emirateList();
    this.getcomapnyDetail();

    this.company_detail.get('applicationId').setValue(JSON.parse(localStorage.getItem("CurrApp")));
    // console.log(JSON.parse( localStorage.getItem("CurrApp")))
    this.year = this.today.getFullYear()
    this.month = this.today.getMonth()

    this.min = new Date(this.year, this.month, this.jstoday, 10, 30);
    this.max = new Date(this.year, this.month, this.jstoday, 10, 30);


  }


  get companyRegistrationDate() { return this.company_detail.get('companyRegistrationDate'); }
  get tradeLicenseNumber() { return this.company_detail.get('tradeLicenseNumber'); }
  get tradeLicenseExpirydate() { return this.company_detail.get('tradeLicenseExpirydate'); }
  get placeofIssue() { return this.company_detail.get('placeofIssue'); }
  get countryOfDomicile() { return this.company_detail.get('countryOfDomicile'); }
  get yearsInBuisness() { return this.company_detail.get('yearsInBuisness'); }
  get noOfEmployees() { return this.company_detail.get('noOfEmployees'); }
  get companyWebSite() { return this.company_detail.get('companyWebSite'); }
  get legalStatus() { return this.company_detail.get('legalStatus'); }
  get parentCompanyApplicable() { return this.company_detail.get('parentCompanyApplicable'); }
  get nob() { return this.company_detail.get('nob'); }
  get tob() { return this.company_detail.get('tob'); }
  get applicationId() { return this.company_detail.get('applicationId'); }


  countryList() {
    this.dropdown.CountryList().
      subscribe(data => {
        // console.log(data);
        this.country = data;
      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }


  emirateList() {
    this.dropdown.emirateCity().
      subscribe(data => {
        // console.log(data);
        this.emiratecity = data;
      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }


  TypeOfBusiness() {
    this.dropdown.TypeOfBusiness().
      subscribe(data => {
        // console.log(data);
        this.business = data;

      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }

  NatureOfBusiness() {
    this.dropdown.natureOfBusiness().
      subscribe(data => {
        // console.log(data);
        this.nature = data;
      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }


  comapnyDetail(event) {
    this.isSubmitted = true;
    if (this.yearsInBuisness.value < 3) {
      this.yearsInBuisness.setErrors({ 'pattern': true })

    } if (!this.company_detail.valid) {
      return;
    }

    this.basic.companyDetail(this.company_detail.value).
      subscribe(data => {
        //  console.log(data);
        if (event == 'saveandcont') {

          if (this.parentCompanyApplicable.value) {
            localStorage.setItem("parent", JSON.stringify("true"))
          }
          else {
            localStorage.removeItem("parent");
          }

          this.router.navigate(['/shareholder-detail']);
        } else {
          this.router.navigate(['/home']);

        }
      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }
  getcomapnyDetail() {

    this.basic.getCompanyDetail(JSON.parse(localStorage.getItem("CurrApp"))).
      subscribe(data => {
        console.log(data.appCompanyDetails);
        if (data.appCompanyDetails.legalStatus) {
          //  console.log(data.appCompanyDetails)
          this.company_detail.get('companyRegistrationDate').setValue(data.appCompanyDetails.appCmpyRegisteredDate);
          this.company_detail.get('tradeLicenseNumber').setValue(data.appCompanyDetails.appCmpyTLNo);
          this.company_detail.get('tradeLicenseExpirydate').setValue(data.appCompanyDetails.appCmpyTLexp);
          this.company_detail.get('placeofIssue').setValue(data.appCompanyDetails.appCmpyTLPlaceOfIssue);
          this.company_detail.get('countryOfDomicile').setValue(data.appCompanyDetails.appCmpyCountry);
          this.company_detail.get('yearsInBuisness').setValue(data.appCompanyDetails.appCmpyYearsInBisiness);
          this.company_detail.get('noOfEmployees').setValue(data.appCompanyDetails.appCmpyNoOfEmployees);
          this.company_detail.get('companyWebSite').setValue(data.appCompanyDetails.appCmpyWebsite);
          this.company_detail.get('legalStatus').setValue(data.appCompanyDetails.legalStatus);
          this.company_detail.get('nob').setValue(data.appCompanyDetails.appCmpyNatureOfBusiness);
          this.company_detail.get('tob').setValue(data.appCompanyDetails.appCmpyTypeOfBusiness);
          this.company_detail.get('parentCompanyApplicable').setValue(data.appCompanyDetails.parentCompanyName);
        }

      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }



}
