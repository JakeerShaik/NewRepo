import { ProductWithQuotationService } from './../_services/product-with-quotation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  productname: any = null;
  quot: any = null;
  quotAvail: boolean = false;
  constructor(private productservice: ProductWithQuotationService, private router: Router) { }

  ngOnInit() {
    this.productname = JSON.parse(localStorage.getItem('product'));
    if (this.productname) {
     
    }
    else {
      this.router.navigate(["/product"]);
    
    }
    this.quotation();
  }

  quotation() {
    this.productservice.quotationData(JSON.parse(localStorage.getItem('instalmentto')),
      JSON.parse(localStorage.getItem('loanmount')), this.productname.producttypecode).
      subscribe(data => {
        this.quot = data.lendmeproduct;
        if (this.quot == "") {
          this.quotAvail = true;
        }
        //console.log(this.quot);
        localStorage.setItem('quotation', JSON.stringify(this.quot));
      },
        error => {
          console.log(error);
        })
  }
  selectedQuot(id: number) {
    localStorage.setItem('SeletedQuotation', JSON.stringify(id));
    this.router.navigate(["/lets-go"]);
  }

}
