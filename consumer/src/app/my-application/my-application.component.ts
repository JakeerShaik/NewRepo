import { AlertService } from './../_services/alert.service';
import { LoanService } from './../_services/loan.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.css']
})
export class MyApplicationComponent implements OnInit {
existingLoan:any=null;
loanAvail: boolean = false;

  constructor(private router: Router,private loan:LoanService,private alert:AlertService) { }

  ngOnInit() {
    this.AllReference();
  }

  AllReference()
  {
    this.loan.AllLoanRef().
    subscribe(data => {
    this.existingLoan=data;
   // console.log(data);
    if (this.existingLoan=="") {
      this.loanAvail = true;
    }

    },
      error => {

         this.alert.error(error.error);
      })
  }

}
