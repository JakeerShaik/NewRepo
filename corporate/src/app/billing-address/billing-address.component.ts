import { BasicDetailsService } from './../_services/basic-details.service';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DropDownService } from '../_services/drop-down.service';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {
  billing_address: FormGroup;
  isSubmitted: boolean = false;
  emiratecity=[];
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";
  parent:boolean=false;
  constructor( private router: Router,private frmBuilder: FormBuilder, private http: HttpClient,
    private alert:AlertService,private dropdown :DropDownService,private basicService:BasicDetailsService) { }

  ngOnInit() {
    this.billing_address = this.frmBuilder.group({
      buildingName:  ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      unitNumber: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      streetName: ["", [Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      area: ["", [Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
      landMark: ["", [Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      cityCode: ["", [Validators.required, Validators.minLength(1),Validators.maxLength(50)]],
      telephoneOffice: ["", [Validators.required, Validators.minLength(9),Validators.maxLength(9), Validators.pattern("^0[0-9].*$")]],
      mobileOffice : ["", [ Validators.minLength(10),Validators.maxLength(10), Validators.pattern("^0[0-9].*$")]],
      faxNo : ["", [Validators.required,Validators.minLength(6),Validators.maxLength(50)]],
      emailOffice: ["", [Validators.required, Validators.minLength(3),Validators.maxLength(50),Validators.pattern(this.emailPattern)]],
      companyType: ["", [Validators.required, Validators.minLength(1),Validators.maxLength(50)]],
      applicationId: ["", [Validators.required, Validators.minLength(15),Validators.maxLength(50)]],
      countryCode: ["", [Validators.required]]
      
    });
    this.emirateList();
    this.getAddress();
    this.billing_address.get('applicationId').setValue(JSON.parse(localStorage.getItem("CurrApp")));
    this.billing_address.get('companyType').setValue("BILLING");
    this.parentCheck();

  }

  
  get buildingName() { return this.billing_address.get('buildingName'); }
  get unitNumber() { return this.billing_address.get('unitNumber'); }
  get area() { return this.billing_address.get('area'); }
  get streetName() { return this.billing_address.get('streetName'); }
  get landMark() { return this.billing_address.get('landMark'); }
  get cityCode() { return this.billing_address.get('cityCode'); }
  get countryCode() { return this.billing_address.get('countryCode'); }
  get telephoneOffice() { return this.billing_address.get('telephoneOffice'); }
  get mobileOffice() { return this.billing_address.get('mobileOffice'); }
  get faxNo() { return this.billing_address.get('faxNo'); }
  get emailOffice() { return this.billing_address.get('emailOffice'); }
  get companyType() { return this.billing_address.get('companyType'); }
  get applicationId() { return this.billing_address.get('applicationId'); }

  getAddress() {
    this.basicService.getAddress(JSON.parse(localStorage.getItem("CurrApp"))).
      subscribe(data => {
        // console.log(data.appAddressDetails);
        if(data.appAddressDetails)
        {
         for(let i=0;i<data.appAddressDetails.length;i++)
         {
           if(data.appAddressDetails[i].companyType=="BILLING")
           {
            // console.log("Billing")
            let telephone=data.appAddressDetails[i].telephoneOffice
            this.billing_address.get('applicationId').setValue(JSON.parse(localStorage.getItem("CurrApp")));
            this.billing_address.get('buildingName').setValue(data.appAddressDetails[i].buildingName);
            this.billing_address.get('unitNumber').setValue(data.appAddressDetails[i].unitNumber);
            this.billing_address.get('area').setValue(data.appAddressDetails[i].area);
            this.billing_address.get('streetName').setValue(data.appAddressDetails[i].streetName);
            this.billing_address.get('landMark').setValue(data.appAddressDetails[i].landMark);
            this.billing_address.get('cityCode').setValue(data.appAddressDetails[i].cityCode);
            this.billing_address.get('countryCode').setValue(data.appAddressDetails[i].countryCode);
            this.billing_address.get('telephoneOffice').setValue(telephone.substr(3));
            this.billing_address.get('mobileOffice').setValue(data.appAddressDetails[i].mobileNumber);
            this.billing_address.get('faxNo').setValue(data.appAddressDetails[i].faxNo);
            this.billing_address.get('emailOffice').setValue(data.appAddressDetails[i].emailOffice);
            this.billing_address.get('companyType').setValue(data.appAddressDetails[i].companyType);
        
           }
         }
        }
      
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
        this.emiratecity=data;
      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }

parentCheck()
{
if(localStorage.getItem("parent"))
{
  this.parent=true;
}
}

  save(event) {
    this.isSubmitted = true;
    if (!this.billing_address.valid)
      return;
    // console.log(event);
      this.basicService.addressSave(this.billing_address.value).
        subscribe(data => {
          if (event == 'saveandcont') {
          console.log(data);
           this.router.navigate(['/registered-address']);
          }else
          {
           this.router.navigate(['/home']);

          }
        },
          error => {
            this.alert.error(error.error.statusDetails.statusMessage);
            console.log(error)
          })
   
  }
}
