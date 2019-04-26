import { LoanService } from './../_services/loan.service';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DropDownService } from '../_services/drop-down.service';
@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  loan_detail: FormGroup;
  isSubmitted: boolean = false;
  banklist = [];
  constructor(private router: Router, private frmBuilder: FormBuilder, private http: HttpClient,
    private dropdown: DropDownService, private alert: AlertService, private loan: LoanService) { }

  ngOnInit() {
    this.loan_detail = this.frmBuilder.group({
      applicantLoanIBan: ["", [Validators.required, Validators.minLength(23), Validators.maxLength(23), Validators.pattern("^AE[0-9]*$")]],
      applicantLoanBankId: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      applicantLoanBranch: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      applicantLoanAccountTitle: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      applicationId: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(50)]]

    });
    this.bank();
    this.getBankDetail();
    this.loan_detail.get('applicationId').setValue(JSON.parse(localStorage.getItem("CurrApp")));

  }


  get applicantLoanIBan() { return this.loan_detail.get('applicantLoanIBan'); }
  get applicantLoanBankId() { return this.loan_detail.get('applicantLoanBankId'); }
  get applicantLoanBranch() { return this.loan_detail.get('applicantLoanBranch'); }
  get applicantLoanAccountTitle() { return this.loan_detail.get('applicantLoanAccountTitle'); }
  get applicationId() { return this.loan_detail.get('applicationId'); }


  getBankDetail() {
    this.loan.getAmtBank(JSON.parse(localStorage.getItem("CurrApp"))).
      subscribe(data => {
        // console.log(data.loanDetails);
        if (data.loanDetails) {
          this.loan_detail.get('applicantLoanIBan').setValue(data.loanDetails.applicantLoanIBan);
          this.loan_detail.get('applicantLoanBankId').setValue(data.loanDetails.applicantLoanBankId);
          this.loan_detail.get('applicantLoanBranch').setValue(data.loanDetails.applicantLoanBranch);
          this.loan_detail.get('applicantLoanAccountTitle').setValue(data.loanDetails.applicantLoanAccountTitle);



        }
      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          //  console.log(error.error)
        })
  }



  bank() {
    this.dropdown.bankName().
      subscribe(data => {
        // console.log(data);
        this.banklist = data;
      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }


  save(event) {
    this.isSubmitted = true;
    if (!this.loan_detail.valid)
      return;
    // console.log(event);
      this.loan.bankDetailSave(this.loan_detail.value).
        subscribe(data => {
          if (event == 'saveandcont') {

          console.log(data);
          this.router.navigate(['/thank-you']);
        }
        else
        {
          this.router.navigate(['/home']);

        }
        },
          error => {
            // this.alert.error(error.error.statusDetails.statusMessage);
            console.log(error)
          })
  
  }




}
