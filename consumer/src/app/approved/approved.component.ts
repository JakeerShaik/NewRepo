import { LoanService } from './../_services/loan.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {
  loanReferenceDetail:any = null;


  constructor(private router: Router,private loan:LoanService) { }

  ngOnInit() {

    this.loanReferenceDetail=JSON.parse(localStorage.getItem('lendmeloan'));
//console.log(this.loanReferenceDetail);
  }

  proceed()
  {
    this.loan.proceed(this.loanReferenceDetail.lndmeloanReference,1).
    subscribe(data => {
      //console.log(data);
      this.router.navigate(["/appointment"]);
      
    },
      error => {

         console.log(error);
      })
  }

  decline()
  {
    this.loan.decline(this.loanReferenceDetail.lndmeloanReference,-1).
    subscribe(data => {
      console.log(data);
      this.router.navigate(["/home"]);
      
    },
      error => {

         console.log(error);
      })
  }

}
