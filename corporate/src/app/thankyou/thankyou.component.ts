import { AlertService } from './../_services/alert.service';
import { LoanService } from './../_services/loan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  selected: boolean = true;

  constructor(private loan:LoanService,private alert:AlertService) { }

  ngOnInit() {
  }

  finalSubmit() {
    this.loan.finalSubmit(JSON.parse(localStorage.getItem("CurrApp"))).
      subscribe(data => {
         console.log(data);
        
         this.alert.error(data.statusDetails.statusMessage);

      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          console.log(error)
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
