import { ProductWithQuotationService } from './../_services/product-with-quotation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
productlist=[];
  constructor(private productservice:ProductWithQuotationService) { }

  ngOnInit() {
    this.productDetail();
  }

  productDetail()
  {
    this.productservice.productData().
    subscribe(data => {
      //console.log(data.loanrangeamount);
     this.productlist=data.loanrangeamount[0].producttypename;
     localStorage.setItem('product', JSON.stringify(data.loanrangeamount[0]));
     localStorage.setItem('productselected', JSON.stringify(data.loanrangeamount[0].producttypecode));//Need To create Selected Product Function
    },
      error => {

         console.log(error);
      })
  }
}
