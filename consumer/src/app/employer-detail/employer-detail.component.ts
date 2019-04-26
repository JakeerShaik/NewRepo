import { AlertService } from './../_services/alert.service';
import { PersonalDetailService } from './../_services/personal-detail.service';
import { DropDownService } from './../_services/drop-down.service';
import { Component, OnInit, NgModule, VERSION } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoanService } from './../_services/loan.service';
import {CommonModule, CurrencyPipe} from '@angular/common'
@Component({
  selector: 'app-employer-detail',
  templateUrl: './employer-detail.component.html',
  styleUrls: ['./employer-detail.component.css']
})
export class EmployerDetailComponent implements OnInit {
  occupation = [];
  industryDrop = [];
  occupationForm: FormGroup;
  isSubmitted: boolean = false;
  formdata: any = null;
  // amount:number = 0.0;
    formattedAmount: string = '';
  constructor(private router: Router, private frmBuilder: FormBuilder, private http: HttpClient,private loan: LoanService,
    private dropDown: DropDownService, private personalService: PersonalDetailService, private alertservices: AlertService,private currencyPipe:CurrencyPipe) { }

  ngOnInit() {
    this.occupationForm = this.frmBuilder.group({
      occupationLevel: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      employeerName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      officeAddress: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      telephoneOffice: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("^0[0-9].*$")]],
      industrySector: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      lengthOfService: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      annualSalary: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });

    this.OccupatinData();
    this.Industry();
    this.formdata = JSON.parse(localStorage.getItem('allFormdata'));
    this.allFormData();
  }
  allFormData() {
    if (this.formdata) {
      if (this.formdata.employee.status == 1) {
        this.occupationForm.get('occupationLevel').setValue(this.formdata.employee.occupationLevel);
        this.occupationForm.get('employeerName').setValue(this.formdata.employee.employeerName);
        this.occupationForm.get('officeAddress').setValue(this.formdata.employee.officeAddress);
        this.occupationForm.get('telephoneOffice').setValue(this.formdata.employee.telephoneOffice);
        this.occupationForm.get('industrySector').setValue(this.formdata.employee.industrySector);
        this.occupationForm.get('lengthOfService').setValue(this.formdata.employee.lengthOfService);
        this.occupationForm.get('annualSalary').setValue(this.formdata.employee.annualSalary);
      }
    }
  }
  get occupationLevel() { return this.occupationForm.get('occupationLevel'); }
  get employeerName() { return this.occupationForm.get('employeerName'); }
  get officeAddress() { return this.occupationForm.get('officeAddress'); }
  get telephoneOffice() { return this.occupationForm.get('telephoneOffice'); }
  get industrySector() { return this.occupationForm.get('industrySector'); }
  get lengthOfService() { return this.occupationForm.get('lengthOfService'); }
  get annualSalary() { return this.occupationForm.get('annualSalary'); }


  addressDatasave(evnt) {
    this.isSubmitted = true;
    if(!this.occupationForm.valid)
    return;
    this.personalService.employerdata(this.occupationForm.value).
      subscribe(data => {
        //console.log(data)
        if(evnt=='cont')
        {
 this.allLoanDetail();
        }
        else{
          this.router.navigate(["/home"]);

        }

      },
        error => {
          this.alertservices.error(error.error.message);

        })
  }

  OccupatinData() {
    this.dropDown.OccupationLevel().
      subscribe(occu => {
        //  console.log(occu);
        this.occupation = occu;
      },
        error => {

          // console.log(error);
        })
  }
  Industry() {
    this.dropDown.natureOfBusiness().
      subscribe(indus => {
        //    console.log(indus);
        this.industryDrop = indus;
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
        this.router.navigate(["/bank-detail"]);

      },
        error => {


        })

  }


  transformAmount(element: FormControl){
    this.formattedAmount = this.currencyPipe.transform(this.annualSalary.value,' ');
    this.occupationForm.get('annualSalary').setValue(this.formattedAmount);

}

}
