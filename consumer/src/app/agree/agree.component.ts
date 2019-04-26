import { AlertService } from './../_services/alert.service';
import { ProductWithQuotationService } from './../_services/product-with-quotation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agree',
  templateUrl: './agree.component.html',
  styleUrls: ['./agree.component.css']
})
export class AgreeComponent implements OnInit {
  selectedProduct = "";
  quotation: any = null;
  selectedQuot: any = null;
  selected: boolean = true;
  cat:number=null;
  subcat:any=null;
  constructor(private productservice: ProductWithQuotationService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.quotation = JSON.parse(localStorage.getItem('quotation'))
    this.selectedProduct = JSON.parse(localStorage.getItem('productselected'))
    this.selectedQuot = JSON.parse(localStorage.getItem('SeletedQuotation'))
    this.cat = JSON.parse(localStorage.getItem('cat'));
    this.subcat = localStorage.getItem('subcat');
    //console.log(this.quotation[this.selectedQuot].productintrestrate)
  }

  LoanSubmitData() {
    this.productservice.loanSubmit(this.quotation[this.selectedQuot].loanamount,this.quotation[this.selectedQuot].monthlyinstalment, this.quotation[this.selectedQuot].totalrepayment,
      this.selectedProduct, this.quotation[this.selectedQuot].tenure, this.quotation[this.selectedQuot].productintrestrate,this.cat,this.subcat).
      subscribe(data => {
       // console.log(data);
        if (data.loanStatus.loanstatuscode == 403) {
          localStorage.setItem('lendmeloan', JSON.stringify(data.lendmeloan));
          this.router.navigate(["/declined"]);
        } else if (data.loanStatus.loanstatuscode == 200) {
          localStorage.setItem('lendmeloan', JSON.stringify(data.lendmeloan));
          this.router.navigate(["/approved"]);
        } else {
          this.alert.error("Something Went Wrong Please try again");
          console.log(data);
        }
      },
        error => {

          this.alert.error("Something Went Wrong Please try again");
          console.log(error.error);

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

}
