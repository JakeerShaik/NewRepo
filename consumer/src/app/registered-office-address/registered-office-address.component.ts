import { AlertService } from './../_services/alert.service';
import { PersonalDetailService } from './../_services/personal-detail.service';
import { DropDownService } from './../_services/drop-down.service';
import { Component, NgModule, VERSION,ViewChild,ViewContainerRef,OnInit,AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, RequiredValidator } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoanService } from './../_services/loan.service';



@Component({
  selector: 'app-registered-office-address',
  templateUrl: './registered-office-address.component.html',
  styleUrls: ['./registered-office-address.component.css']
})
export class RegisteredOfficeAddressComponent implements OnInit, AfterViewInit  {
  address: FormGroup;
  isSubmitted: boolean = false;
  cityList=[];
  formdata:any=null;
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";

  constructor( private router: Router,private frmBuilder: FormBuilder, private http: HttpClient,private loan: LoanService,
    private dropDown:DropDownService,private perosnalDetail:PersonalDetailService,private alertservice:AlertService) { }



  ngOnInit() {

    this.address = this.frmBuilder.group({
      buildingName:  ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      unitNum: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      areaLocality: ["", [Validators.required, Validators.minLength(3)]],
      streetNumName: ["", [Validators.maxLength(100)]],
      landMark: ["", [Validators.maxLength(50)]],
      emiratesCity: ["", [Validators.required, Validators.minLength(1),Validators.maxLength(50)]],
      telephoneHome: ["", [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^0[0-9].*$")]],
      telephoneMobile : ["", ],
      faxNum : ["", [Validators.required, Validators.minLength(2),Validators.maxLength(50)]],
      emailPersonal: [" ", []],
      emailOffice: ["", [Validators.required, Validators.minLength(6),Validators.maxLength(50),Validators.pattern(this.emailPattern)]],
   
      

    });
    this.AllCity();
    this.formdata=JSON.parse(localStorage.getItem('allFormdata'));
   
  }
  ngAfterViewInit()
  {
    this.notrequired();

    this.allFormData();

  }
  allFormData()
  {
    if(this.formdata)
    {
    if(this.formdata.address.status==1)
    {
    this.address.get('buildingName').setValue(this.formdata.address.buildingName);
    this.address.get('unitNum').setValue(this.formdata.address.unitNum);
    this.address.get('areaLocality').setValue(this.formdata.address.areaLocality);
    this.address.get('streetNumName').setValue(this.formdata.address.streetNumName);
    this.address.get('landMark').setValue(this.formdata.address.landMark);
    this.address.get('emiratesCity').setValue(this.formdata.address.emiratesCity);
    this.address.get('telephoneHome').setValue(this.formdata.address.telephoneHome);
    this.address.get('telephoneMobile').setValue(this.formdata.address.telephoneMobile);
    this.address.get('faxNum').setValue(this.formdata.address.faxNum);
    this.address.get('emailPersonal').setValue(this.formdata.address.emailPersonal);
    this.address.get('emailOffice').setValue(this.formdata.address.emailOffice);
  }
  }
}
  get buildingName() { return this.address.get('buildingName'); }
  get unitNum() { return this.address.get('unitNum'); }
  get areaLocality() { return this.address.get('areaLocality'); }
  get streetNumName() { return this.address.get('streetNumName'); }
  get landMark() { return this.address.get('landMark'); }
  get emiratesCity() { return this.address.get('emiratesCity'); }
  get telephoneHome() { return this.address.get('telephoneHome'); }
  get telephoneMobile() { return this.address.get('telephoneMobile'); }
  get faxNum() { return this.address.get('faxNum'); }
  get emailPersonal() { return this.address.get('emailPersonal'); }
  get emailOffice() { return this.address.get('emailOffice'); }

  notrequired() {

    const fax = this.address.get('faxNum');
    const emailid = this.address.get('emailPersonal');
    const emailoff= this.address.get('emailOffice');
    const telhome=this.address.get('telephoneHome');
    const street=this.address.get('streetNumName');
    const land=this.address.get('landMark');
  
    this.address.valueChanges.subscribe(
      (mode: string) => {

        // fax.clearValidators();
        fax.setValidators([Validators.minLength(3), Validators.maxLength(50)]);
        emailid.clearValidators();
        emailoff.setValidators([Validators.minLength(6),Validators.maxLength(50),Validators.pattern(this.emailPattern)]);
        telhome.setValidators([Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^0[0-9].*$")]);
        street.clearValidators();
        land.clearValidators();
      
        

          fax.updateValueAndValidity();
        emailid.updateValueAndValidity();
        emailoff.updateValueAndValidity();
        telhome.updateValueAndValidity();
        street.updateValueAndValidity();
        land.updateValueAndValidity();

      });
  }



  save(evnt) {
    
    this.isSubmitted = true;
    if (!this.address.valid)
      return;
    this.perosnalDetail.AddressData(this.address.value).
      subscribe(
        data => {
          if(evnt=='cont')
          {
           this.allLoanDetail();
          }
          else
          {
            this.router.navigate(["/home"]);

          }

        },
        error => {
        
         this.alertservice.error(error.error.message);

        });
  }


  AllCity() {
    this.dropDown.Regions(2).
      subscribe(region => {
       // console.log(region);
        this.cityList = region;
      },
        error => {

          // console.log(error);
        })
  }

  allLoanDetail() {
    this.loan.loanDetail().
      subscribe(data => {
        //console.log(data);
        localStorage.setItem('allFormdata', JSON.stringify(data));

        this.router.navigate(["/employer-detail"]);
 

      },
        error => {


        })

  }
  


}
