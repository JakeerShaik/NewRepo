import { AlertService } from './../_services/alert.service';
import { LoanService } from './../_services/loan.service';
import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { Options, ChangeContext, PointerType } from 'ng5-slider';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { DropDownService } from '../_services/drop-down.service';

@Component({
  selector: 'app-loan-amount',
  templateUrl: './loan-amount.component.html',
  styleUrls: ['./loan-amount.component.css']
})
export class LoanAmountComponent implements OnInit, AfterViewInit, DoCheck {

  loanerror: boolean = false;
  tenureerror: boolean = false;
  loanamountForm: FormGroup;
  isSubmitted: boolean = false;
  app_Id: string = null;
  loanreason = [];
  loanDetailData = [];
  constructor(private frmBuilder: FormBuilder, private router: Router,
    private loan: LoanService, private alert: AlertService, private dropdown: DropDownService) { }


  amountvalue: number = 0;
  amount: Options = {
    floor: 0,
    ceil: 0,
    step: 100,
    showSelectionBar: true,
    translate: (value: number): string => {
      return 'AED ' + value;
    }
  };

  monthValue: number = 0;
  month: Options = {
    floor: 0,
    ceil: 0,
    disabled: true,
    showSelectionBar: true,
    translate: (value: number): string => {
      return value + ' Months';
    }

  };

  ngDoCheck() {

  }


  ngOnInit() {
    this.loanamountForm = this.frmBuilder.group({

      reason: ["", Validators.compose([Validators.required])],

    });
    this.app_Id = JSON.parse(localStorage.getItem("CurrApp"));
    this.loanReason();
    this.maxMinAMtTenure();

  }

  ngAfterViewInit() {

  }


  get reason() { return this.loanamountForm.get('reason'); }


  nextStep() {
    this.isSubmitted = true;
    let reasonVal = this.reason.value;
    // console.log(reasonVal);
    if (this.amountvalue == 0 || this.monthValue == 0) {
      if (this.amountvalue == 0) {
        this.loanerror = true;
      }
      else if (this.monthValue == 0) {
        this.tenureerror = true;
      } else if (this.reason.value=="") {
        return;
      }

      return;
    } else {
      this.loan.LoanDetails(this.app_Id, this.reason.value, this.amountvalue, this.monthValue, "").
        subscribe(data => {

          //  console.log(data);
          this.router.navigate(['/lets-go']);

        },
          error => {
            this.alert.error(error.error.statusDetails.statusMessage);
            //  console.log(error.error)
          })
    }
  }

  loanReason() {
    this.dropdown.loanReason().
      subscribe(data => {

        //  console.log(data);
        this.loanreason = data;

      },
        error => {
          this.alert.error(error.error.statusDetails);
          //  console.log(error.error)
        })
  }

  maxMinAMtTenure() {
    this.loan.loanMaxMinTermAmt().
      subscribe(data => {
        // console.log(data);
        const newOptions = Object.assign({}, this.amount);
        newOptions.ceil = data.maxAmount;
        newOptions.floor = data.minAmount
        this.amount = newOptions;
        this.amountvalue = data.minAmount

        const monthOptions = Object.assign({}, this.month)
        monthOptions.ceil = data.maxTerm;
        monthOptions.floor = data.minTerm;
        this.month = monthOptions;
        this.monthValue = data.minTerm;
        this.loanDetail();

      },
        error => {
          this.alert.error(error.error.statusDetails);
          //  console.log(error.error)
        })
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    // this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
    // console.log(this.amountvalue);
    this.loan.loanTerm(this.amountvalue).
      subscribe(data => {

        // console.log(data);
        const monthOptionsTenure = Object.assign({}, this.month)
        monthOptionsTenure.ceil = data.productConfigTier.term;
        monthOptionsTenure.floor = data.productConfigTier.term;
        this.month = monthOptionsTenure;
        this.monthValue = data.productConfigTier.term;;


      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          //  console.log(error.error)
        })

  }

  loanDetail() {
    this.loan.getAmtBank(this.app_Id).
      subscribe(data => {

        this.loanDetailData = data.loanDetails;
        //  console.log(this.loanDetailData);
        if (data.loanDetails) {
          this.amountvalue = data.loanDetails.applicantLoanAmount;
          this.monthValue = data.loanDetails.applicantLoanTerm;
          this.loanamountForm.get('reason').setValue(data.loanDetails.applicantLoanReason);



        }

      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          //  console.log(error.error)
        })
  }


}
