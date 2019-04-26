import { AlertService } from './../_services/alert.service';
import { BasicDetailsService } from './../_services/basic-details.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.css']
})
export class MyApplicationComponent implements OnInit {
  existingLoan: any = null;
  constructor(private basicdetail: BasicDetailsService, private router: Router, private alert: AlertService) { }
  ngOnInit() {
    this.allExistingApplication();
  }

  selectAppid($event: string) {
    localStorage.setItem("CurrApp", JSON.stringify($event));
    this.basicdetail.getAppDetail($event).
      subscribe(data => {
        //  console.log(data.applicationFormStatus);
        if (data.applicationFormStatus.formOneStatus == "SAVED" || data.applicationFormStatus.formOneStatus == "PENDING") {
          this.router.navigate(['/loan-amount']);

        } else if (data.applicationFormStatus.formTwoStatus == "SAVED" || data.applicationFormStatus.formTwoStatus == "PENDING") {
          this.router.navigate(['/shareholder-document']);

        } else if (data.applicationFormStatus.formOthreeStatus == "SAVED" || data.applicationFormStatus.formOthreeStatus == "PENDING") {
          this.router.navigate(['/statement']);

        } else if (data.applicationFormStatus.formFourStatus == "SAVED" || data.applicationFormStatus.formFiveStatus == "PENDING") {
          this.router.navigate(['/company-detail']);

        } else if (data.applicationFormStatus.formFiveStatus == "SAVED" || data.applicationFormStatus.formFourStatus == "PENDING") {
          this.router.navigate(['/shareholder-detail']);

        } else if (data.applicationFormStatus.formSixStatus == "SAVED" || data.applicationFormStatus.formSixStatus == "PENDING") {
          this.router.navigate(['/billing-address']);

        } else if (data.applicationFormStatus.formSevenStatus == "SAVED" || data.applicationFormStatus.formSevenStatus == "PENDING") {
          this.router.navigate(['/bank-detail']);
        }
        else {
          // this.router.navigate(['/thank-you']);
          this.alert.error("This Application is already completed.");

        }

      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }


  newLoanExistingUser() {

    this.basicdetail.generateAppid().
      subscribe(data => {
        //  console.log(data.applicationFormStatus);
        localStorage.setItem("CurrApp", JSON.stringify(data.applicationId.applicationId))
        // JSON.parse(localStorage.getItem("applicantControlType"))
        this.basicdetail.newLoanExisting(data.applicationId.applicationId,
          JSON.parse(localStorage.getItem("email")), "EZSTART").
          subscribe(loan => {
            //  console.log(data);

            this.router.navigate(['/loan-amount']);

          },
            error => {
              this.alert.error(error.error.statusMessage);
              // console.log(error.error.statusMessage)
            })

      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }


  allExistingApplication() {
    this.basicdetail.allExistingApp(JSON.parse(localStorage.getItem("email"))).
      subscribe(allApp => {
        // console.log(allApp.userDetails.applicationDetails);
        this.existingLoan = allApp.userDetails.applicationDetails;

      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }


}
