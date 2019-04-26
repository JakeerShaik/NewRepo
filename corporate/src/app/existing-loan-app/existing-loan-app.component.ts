import { LoginService } from './../_services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { AlertService } from './../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-existing-loan-app',
  templateUrl: './existing-loan-app.component.html',
  styleUrls: ['./existing-loan-app.component.css']
})
export class ExistingLoanAppComponent implements OnInit {
  existing_loan: FormGroup;
  isSubmitted: boolean = false;
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";


  constructor(private router: Router, private frmBuilder: FormBuilder,
    private http: HttpClient, private alertService: AlertService, private login: LoginService) { }

  ngOnInit() {
    this.existing_loan = this.frmBuilder.group({

      applicantEmailId: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), , Validators.pattern(this.emailPattern)]],
      applicantPassword: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]



    });
    localStorage.clear();
  }


  get applicantEmailId() { return this.existing_loan.get('applicantEmailId'); }
  get applicantPassword() { return this.existing_loan.get('applicantPassword'); }





  userlogin() {
    this.alertService.removeAlert();
    this.isSubmitted = true;

    if (!this.existing_loan.valid)
      return;
    this.login.Login(this.existing_loan.value).
      subscribe(data => {
        // console.log(data);
        // return;
        // this.router.navigate(['/loan-amount']);
        localStorage.setItem('allApp', JSON.stringify(data.userDetail.applicationDetails));
        localStorage.setItem('email', JSON.stringify(data.userDetail.applicantEmailId));

        this.router.navigate(['/my-application']);
      },
        error => {
          this.alertService.error(error.error.statusDetails.statusMessage);
          //console.log(error.error.statusDetails.statusMessage)
        })
  }


}
