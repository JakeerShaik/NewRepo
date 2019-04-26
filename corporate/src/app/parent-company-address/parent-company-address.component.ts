import { BasicDetailsService } from './../_services/basic-details.service';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DropDownService } from '../_services/drop-down.service';
@Component({
  selector: 'app-parent-company-address',
  templateUrl: './parent-company-address.component.html',
  styleUrls: ['./parent-company-address.component.css']
})
export class ParentCompanyAddressComponent implements OnInit {
  parent_address: FormGroup;
  isSubmitted: boolean = false;
  emiratecity=[];
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";

  constructor( private router: Router,private frmBuilder: FormBuilder, private http: HttpClient,
    private alert:AlertService,private dropdown:DropDownService,private basicService:BasicDetailsService) { }

  ngOnInit() {
    this.parent_address = this.frmBuilder.group({
      buildingName:  ["", [ Validators.minLength(3), Validators.maxLength(100)]],
      unitNumber: ["", [ Validators.minLength(1), Validators.maxLength(100)]],
      streetName: ["", [Validators.minLength(3),Validators.maxLength(100)]],
      area: ["", [ Validators.minLength(3),Validators.maxLength(100)]],
      landMark: ["", [ Validators.minLength(3),Validators.maxLength(50)]],
      cityCode: ["", [ Validators.minLength(1),Validators.maxLength(50)]],
      telephoneOffice: ["", [ Validators.minLength(9),Validators.maxLength(9), Validators.pattern("^0[0-9].*$")]],
      mobileOffice : ["", [ Validators.minLength(10),Validators.maxLength(10), Validators.pattern("^0[0-9].*$")]],
      faxNo : ["", [Validators.minLength(6),Validators.maxLength(50)]],
      emailOffice: ["", [ Validators.minLength(3),Validators.maxLength(50),Validators.pattern(this.emailPattern)]],
      companyType: ["", [ Validators.minLength(1),Validators.maxLength(50)]],
      applicationId: ["", [ Validators.minLength(15),Validators.maxLength(50)]],
      countryCode: ["", []]
      

    });
    this.emirateList();
    this.getAddress();
    this.parent_address.get('applicationId').setValue(JSON.parse(localStorage.getItem("CurrApp")));
    this.parent_address.get('companyType').setValue("PARENT");


  }


  get buildingName() { return this.parent_address.get('buildingName'); }
  get unitNumber() { return this.parent_address.get('unitNumber'); }
  get area() { return this.parent_address.get('area'); }
  get streetName() { return this.parent_address.get('streetName'); }
  get landMark() { return this.parent_address.get('landMark'); }
  get cityCode() { return this.parent_address.get('cityCode'); }
  get countryCode() { return this.parent_address.get('countryCode'); }
  get telephoneOffice() { return this.parent_address.get('telephoneOffice'); }
  get mobileOffice() { return this.parent_address.get('mobileOffice'); }
  get faxNo() { return this.parent_address.get('faxNo'); }
  get emailOffice() { return this.parent_address.get('emailOffice'); }
  get companyType() { return this.parent_address.get('companyType'); }
  get applicationId() { return this.parent_address.get('applicationId'); }

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


  save(event) {
    this.isSubmitted = true;
    if (!this.parent_address.valid)
      return;
    // console.log(event);
      this.basicService.addressSave(this.parent_address.value).
        subscribe(data => {
          if (event == 'saveandcont') {

          console.log(data);
          this.router.navigate(['/bank-detail']);
        }
        else
        {
          this.router.navigate(['/home']);
          
        }
        },
          error => {
             this.alert.error(error.error.error);
            // console.log(error)
          })
  
  }

  getAddress(type:string="PARENT") {
    this.basicService.getAddress(JSON.parse(localStorage.getItem("CurrApp"))).
      subscribe(data => {
        if(data.appAddressDetails)
        {
          // console.log(data.appAddressDetails)
         for(let i=0;i<data.appAddressDetails.length;i++)
         {
           if(data.appAddressDetails[i].companyType==type)
           {
            // console.log("Billing")
            let telephone=data.appAddressDetails[i].telephoneOffice

            this.parent_address.get('applicationId').setValue(JSON.parse(localStorage.getItem("CurrApp")));
            this.parent_address.get('buildingName').setValue(data.appAddressDetails[i].buildingName);
            this.parent_address.get('unitNumber').setValue(data.appAddressDetails[i].unitNumber);
            this.parent_address.get('area').setValue(data.appAddressDetails[i].area);
            this.parent_address.get('streetName').setValue(data.appAddressDetails[i].streetName);
            this.parent_address.get('landMark').setValue(data.appAddressDetails[i].landMark);
            this.parent_address.get('cityCode').setValue(data.appAddressDetails[i].cityCode);
            this.parent_address.get('countryCode').setValue(data.appAddressDetails[i].countryCode);
            this.parent_address.get('telephoneOffice').setValue(telephone.substr(3));
            this.parent_address.get('mobileOffice').setValue(data.appAddressDetails[i].mobileNumber);
            this.parent_address.get('faxNo').setValue(data.appAddressDetails[i].faxNo);
            this.parent_address.get('emailOffice').setValue(data.appAddressDetails[i].emailOffice);
            this.parent_address.get('companyType').setValue("PARENT");
        
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

      this.getAddress("REGISTERED")
    }
    if (!event.target.checked) {

      // this.registered_address.reset();
    }
  }

}
