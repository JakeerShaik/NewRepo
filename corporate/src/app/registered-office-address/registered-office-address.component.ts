import { BasicDetailsService } from './../_services/basic-details.service';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DropDownService } from '../_services/drop-down.service';
@Component({
  selector: 'app-registered-office-address',
  templateUrl: './registered-office-address.component.html',
  styleUrls: ['./registered-office-address.component.css']
})
export class RegisteredOfficeAddressComponent implements OnInit {
  registered_address: FormGroup;
  isSubmitted: boolean = false;
  emiratecity = [];
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";
  parent: boolean = false;


  constructor(private router: Router, private frmBuilder: FormBuilder, private http: HttpClient,
    private alert: AlertService, private dropdown: DropDownService, private basicService: BasicDetailsService) { }


  ngOnInit() {
    this.registered_address = this.frmBuilder.group({
      buildingName: ["", [Validators.minLength(3), Validators.maxLength(100)]],
      unitNumber: ["", [Validators.minLength(1), Validators.maxLength(100)]],
      streetName: ["", [Validators.minLength(3), Validators.maxLength(100)]],
      area: ["", [Validators.minLength(3), Validators.maxLength(100)]],
      landMark: ["", [Validators.minLength(3), Validators.maxLength(50)]],
      cityCode: ["", [Validators.minLength(1), Validators.maxLength(50)]],
      telephoneOffice: ["", [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^0[0-9].*$")]],
      mobileOffice: ["", [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^0[0-9].*$")]],
      faxNo: ["", [Validators.minLength(6), Validators.maxLength(50)]],
      emailOffice: ["", [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(this.emailPattern)]],
      companyType: ["", [Validators.minLength(1), Validators.maxLength(50)]],
      applicationId: ["", [Validators.minLength(15), Validators.maxLength(50)]],
      countryCode: ["", []]


    });
    this.emirateList();
    this.getAddress()
    this.registered_address.get('applicationId').setValue(JSON.parse(localStorage.getItem("CurrApp")));
    this.registered_address.get('companyType').setValue("REGISTERED");
    this.parentCheck();
    
  
  }

  get buildingName() { return this.registered_address.get('buildingName'); }
  get unitNumber() { return this.registered_address.get('unitNumber'); }
  get area() { return this.registered_address.get('area'); }
  get streetName() { return this.registered_address.get('streetName'); }
  get landMark() { return this.registered_address.get('landMark'); }
  get cityCode() { return this.registered_address.get('cityCode'); }
  get countryCode() { return this.registered_address.get('countryCode'); }
  get telephoneOffice() { return this.registered_address.get('telephoneOffice'); }
  get mobileOffice() { return this.registered_address.get('mobileOffice'); }
  get faxNo() { return this.registered_address.get('faxNo'); }
  get emailOffice() { return this.registered_address.get('emailOffice'); }
  get companyType() { return this.registered_address.get('companyType'); }
  get applicationId() { return this.registered_address.get('applicationId'); }

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

  parentCheck() {
    if (localStorage.getItem("parent")) {
      this.parent = true;
    }
  }



  save(event) {
    this.isSubmitted = true;
    if (!this.registered_address.valid)
      return;
    // console.log(event);
    this.basicService.addressSave(this.registered_address.value).
      subscribe(data => {
        if (event == 'saveandcont') {

          // console.log(data);
          // this.router.navigate(['/loan-amount']);
          if (localStorage.getItem("parent")) {
            this.router.navigate(['/parent-company-address']);

          } else {
            this.router.navigate(['/bank-detail']);

          }
        }
        else {
          this.router.navigate(['/home']);

        }
      },
        error => {
          this.alert.error(error.error.error);
          // console.log(error)
        })

  }

  getAddress(type: string = 'REGISTERED') {

    this.basicService.getAddress(JSON.parse(localStorage.getItem("CurrApp"))).
      subscribe(data => {
        // console.log(data.appAddressDetails)
        if (data.appAddressDetails) {
          for (let i = 0; i < data.appAddressDetails.length; i++) {
            if (data.appAddressDetails[i].companyType == type) {
              // console.log("Billing")
              let telephone=data.appAddressDetails[i].telephoneOffice
             
              this.registered_address.get('applicationId').setValue(JSON.parse(localStorage.getItem("CurrApp")));
              this.registered_address.get('buildingName').setValue(data.appAddressDetails[i].buildingName);
              this.registered_address.get('unitNumber').setValue(data.appAddressDetails[i].unitNumber);
              this.registered_address.get('area').setValue(data.appAddressDetails[i].area);
              this.registered_address.get('streetName').setValue(data.appAddressDetails[i].streetName);
              this.registered_address.get('landMark').setValue(data.appAddressDetails[i].landMark);
              this.registered_address.get('cityCode').setValue(data.appAddressDetails[i].cityCode);
              this.registered_address.get('countryCode').setValue(data.appAddressDetails[i].countryCode);
              this.registered_address.get('telephoneOffice').setValue(telephone.substr(3));
              this.registered_address.get('mobileOffice').setValue(data.appAddressDetails[i].mobileNumber);
              this.registered_address.get('faxNo').setValue(data.appAddressDetails[i].faxNo);
              this.registered_address.get('emailOffice').setValue(data.appAddressDetails[i].emailOffice);
              this.registered_address.get('companyType').setValue("REGISTERED");

            }
          }
        }

      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }

  preAddress(event) {
    // console.log(event)
    if (event.target.checked) {

      this.getAddress("BILLING")
    }
    if (!event.target.checked) {

      // this.registered_address.reset();
    }
  }
}
