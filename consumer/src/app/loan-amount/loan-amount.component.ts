import { ProductWithQuotationService } from './../_services/product-with-quotation.service';
import { AlertService } from './../_services/alert.service';
import { DropDownService } from './../_services/drop-down.service';
import { Options, ChangeContext, PointerType, Ng5SliderModule } from 'ng5-slider';
import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
@Component({
  selector: 'app-loan-amount',
  templateUrl: './loan-amount.component.html',
  styleUrls: ['./loan-amount.component.css']
})
export class LoanAmountComponent implements OnInit, AfterViewInit {
  productdata: any = null;
  maxLoanAmount: number = null;
  emilimit: any = null;
  loanamountForm: FormGroup;
  loanerror: boolean = false;
  emierror: boolean = false;
  selectedLoanAmt: number = 0;
  selectedEmiamt: number = 0;
  amountvalue: number = 0;
  emiValue: number = 0;
  category = [];
  subCat = [];
  isSubmitted: boolean = false;
  selectedCat: any = null;
  selectedSubcat: any = null;
  freetext: boolean = false;
  selectbox: boolean = true;
  // isSubmitted: boolean = false;
  constructor(private productservice: ProductWithQuotationService, private frmBuilder: FormBuilder, private router: Router, private dropdown: DropDownService, private alert: AlertService) { }

  ngOnInit() {
    this.loanamountForm = this.frmBuilder.group({
      loanamt: ["", [Validators.required]],
      emi: ["", Validators.compose([Validators.required])],
      cat: ["", Validators.compose([Validators.required])],
      subcat: ["", Validators.compose([Validators.required])],

    });

    if (!localStorage.getItem("product")) {
      this.router.navigate(["/product"]);
    }
    this.productdata = JSON.parse(localStorage.getItem('product'));
    this.maxLoanAmount = this.productdata.maxvalue
    console.log(this.productdata);
    // this.getLoanAMount()
    this.emival();
    this.amount.ceil = this.maxLoanAmount;
    this.amount.floor = this.productdata.minvalue;
    this.amountvalue = this.productdata.minvalue;
    this.month.floor=this.productdata.minrepayableAmount;
    this.emiValue=this.productdata.minrepayableAmount;

    this.selectedAmt();

    this.loanReasonCat();
  }
  ngAfterViewInit() {

  }

  get loanamt() { return this.loanamountForm.get('loanamt'); }
  get emi() { return this.loanamountForm.get('emi'); }
  get cat() { return this.loanamountForm.get('cat'); }
  get subcat() { return this.loanamountForm.get('subcat'); }

  manualRefreshEnabled: boolean = true;
  manualRefresh: EventEmitter<void> = new EventEmitter<void>();
  isCollapsed: boolean = true;
  minValue: number = 20;
  maxValue: number = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };

  selectedAmt() {

    this.selectedLoanAmt = JSON.parse(localStorage.getItem('loanmount'));
    this.selectedEmiamt = JSON.parse(localStorage.getItem('instalmentto'));
    this.selectedCat = JSON.parse(localStorage.getItem('cat'));
    this.selectedSubcat = JSON.parse(localStorage.getItem('subcat'));
    if (this.selectedLoanAmt) {
      this.amountvalue = this.selectedLoanAmt;
      this.emiValue = this.selectedEmiamt;
      this.loanamountForm.get('cat').setValue(this.selectedCat);
      this.loanReasonSubCat(this.selectedCat)

      this.loanamountForm.get('subcat').setValue(this.selectedSubcat);
    }
  }


  amount: Options = {
    floor: 0,
    ceil: 0,
    step: 100,

    showSelectionBar: true,
    translate: (value: number): string => {
      this.emilimit = value;
      return value + ' AED ';
    },
    selectionBarGradient: {
      from: '#55A7F0',
      to: '#409B39'
    }
  };

  month: Options = {
    floor: 0,
    ceil: 0,
    step: 100,
    showSelectionBar: true,
    translate: (value: number): string => {
      return value + ' AED';
    },
    selectionBarGradient: {
      from: '#55A7F0',
      to: '#409B39'
    }
  };


  emival() {
    this.loanamountForm.valueChanges.subscribe(data => {
      const newOptions = Object.assign({}, this.month);
      newOptions.ceil = data.loanamt;
      this.month = newOptions;
    })

  }
  nextStep() {
    this.isSubmitted = true;
    if (this.cat.value == "") {
      return;
    }

    if (this.subcat.value == "") {
      return;
    }

    if (this.amountvalue == 0 || this.emiValue == 0) {
      if (this.amountvalue == 0) {
        this.loanerror = true;
      }
      else if (this.emiValue == 0) {
        this.emierror = true;
      }

      return;
    } else {

      this.productservice.quotationData(this.emiValue,
        this.amountvalue, this.productdata.producttypecode).
        subscribe(data => {

          console.log(data);
          if (data.response.statuscode == 301) {
            this.alert.error(data.response.message)
          }
          else {
            localStorage.setItem('loanmount', JSON.stringify(this.amountvalue));
            localStorage.setItem('instalmentto', JSON.stringify(this.emiValue));
            localStorage.setItem('cat', JSON.stringify(this.cat.value));
            localStorage.setItem('subcat', JSON.stringify(this.subcat.value));
            this.router.navigate(["/quotation"]);
          }
        },
          error => {
            console.log(error);
          })


    }
  }


  loanReasonCat() {
    this.dropdown.loanReasonCat().
      subscribe(data => {
        // console.log(data);

        this.category = data;
      },
        error => {

          console.log(error);
        })
  }

  loanReasonSubCat($event) {
    // console.log($event);
    this.dropdown.loanReasonSubCat($event).
      subscribe(data => {
        // console.log(data);
        if ($event == 8) {
          this.freetext = true;
          this.selectbox = false;
          this.loanamountForm.get('subcat').setValue("");

        } else {
          this.freetext = false;
          this.selectbox = true;
        }
        this.subCat = data;
      },
        error => {

          console.log(error);
        })
  }


}
