import { AlertService } from './../_services/alert.service';
import { PersonalDetailService } from './../_services/personal-detail.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { DropDownService } from './../_services/drop-down.service';
import { LoanService } from './../_services/loan.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  bankname = [];
  branchname = [];
  bank: FormGroup;
  isSubmitted: boolean = false;
  formdata: any = null;

  selected: boolean = true;

  constructor(private router: Router, private frmBuilder: FormBuilder, private http: HttpClient, private loan: LoanService,
    private dropDown: DropDownService, private personalService: PersonalDetailService, private alertservices: AlertService) { }

  ngOnInit() {
    this.bank = this.frmBuilder.group({
      accountHolderName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      accountNumber: ["", [Validators.required, Validators.minLength(23), Validators.maxLength(23), Validators.pattern("^AE[0-9].*$")]],
      bankName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      bankBranch: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      agree: ["", [Validators.requiredTrue]],

    });
    // this.bankNameData();
    this.formdata = JSON.parse(localStorage.getItem('allFormdata'));
    this.allFormData();
  }

  save(evnt) {
    this.isSubmitted = true;
    this.alertservices.removeAlert()
    if (!this.bank.valid)
      return;
    this.loan.ibanValidate(this.accountNumber.value).
      subscribe(
        data => {
          if (data.ibanStatus == "500") {
            this.alertservices.error("Enter Valid IBAN Number")

          }
          else {
            // console.log("succ");

            this.personalService.bankdata(this.bank.value).
              subscribe(
                data => {

                  if (evnt == 'cont') {
                    this.allLoanDetail();
                  } else {
                    this.router.navigate(["/home"]);
                  }
                  // console.log("success");


                },
                error => {
                  //  console.log(error);
                  this.alertservices.error(error.error.message)
                  //  console.log(error);

                });

          }
        },
        error => {
          //  console.log(error);
          this.alertservices.error(error.error.message)
          //  console.log(error);
        });


  }

  allFormData() {
    if (this.formdata) {
      if (this.formdata.bank.status == 1) {
        this.bank.get('accountHolderName').setValue(this.formdata.bank.accountHolderName);
        this.bank.get('accountNumber').setValue(this.formdata.bank.accountNumber);
        this.bank.get('bankName').setValue(this.formdata.bank.bankName);
        this.bank.get('bankBranch').setValue(this.formdata.bank.bankBranch);
      }
    }
  }

  get accountHolderName() { return this.bank.get('accountHolderName'); }
  get accountNumber() { return this.bank.get('accountNumber'); }
  get bankName() { return this.bank.get('bankName'); }
  get bankBranch() { return this.bank.get('bankBranch'); }
  get agree() { return this.bank.get('agree'); }


  bankNameData() {
    this.dropDown.bankName().
      subscribe(bank => {
        // console.log(bank);
        this.bankname = bank;
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

        this.router.navigate(["/agree"]);

      },
        error => {


        })

  }

  checkBox(event) {
    if (event.target.checked) {
      this.selected = false
    }
    else {

      this.selected = true

    }

  }

  ibanValidate()
  {
    // console.log(this.accountNumber.value.length)
    this.alertservices.removeAlert();
    if(this.accountNumber.value.length==23)
    {
    this.loan.ibanValidate(this.accountNumber.value).
    subscribe(
      data => {

        if (data.ibanStatus == "500") {
          // this.accountNumber.setValidators([Validators.required])
          // this.accountNumber.updateValueAndValidity();
          this.alertservices.error("Enter Valid IBAN Number")
          this.bank.get('bankName').setValue("");

        }
        else {
          //  console.log(data.bankDetailsEntity.bankName);
           this.bank.get('bankName').setValue(data.bankDetailsEntity.bankName);


        }
      },
      error => {
        //  console.log(error);
        this.alertservices.error(error.error.message)
        //  console.log(error);
      });
  }
  }
  // onkeypress(textValue : string)
  // {
  // console.log(textValue);
  // this.bank.get('accountNumber').setValue("AE"+textValue);


  // }

  // branchNameData() {
  //   this.dropDown.OccupationLevel().
  //     subscribe(branch => {
  //       console.log(branch);
  //       this.branchname = branch;
  //     },
  //       error => {

  //         // console.log(error);
  //       })
  // }

}
