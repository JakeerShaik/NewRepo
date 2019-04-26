import { PassMatch } from './../pass-match';
import { LoanService } from './../_services/loan.service';
import { LoginService } from './../_services/login.service';
import { Router } from '@angular/router';
import { BasicDetailsService } from './../_services/basic-details.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { AlertService } from './../_services/alert.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {
  Form_basic_detail: FormGroup;
  isSubmitted: boolean = false;
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";

  constructor(private alertService: AlertService, private router: Router, private frmBuilder: FormBuilder, private http: HttpClient,
    private basicService: BasicDetailsService, private login: LoginService, private loan: LoanService) { }

  ngOnInit() {

    this.Form_basic_detail = this.frmBuilder.group({
      // firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      // lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      applicantEmailId: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100),Validators.pattern(this.emailPattern)]],
      applicantPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPass: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    },
    {
      validator: PassMatch.Match("applicantPassword","confirmPass")
    })
  }

  // get firstName() { return this.Form_basic_detail.get('firstName'); }
  // get lastName() { return this.Form_basic_detail.get('lastName'); }
  get applicantEmailId() { return this.Form_basic_detail.get('applicantEmailId'); }
  get applicantPassword() { return this.Form_basic_detail.get('applicantPassword'); }
  get confirmPass() { return this.Form_basic_detail.get('confirmPass'); }




  save() {
    this.isSubmitted = true;
    if (!this.Form_basic_detail.valid)
      return;

    this.basicService.registerapplicant(this.Form_basic_detail.value).
      subscribe(
        data => {
          this.login.login(this.applicantEmailId.value, this.applicantPassword.value).
            subscribe(
              logindata => {
                localStorage.setItem('currentUser', JSON.stringify(logindata));
                this.allLoanDetail();
                this.router.navigate(["/product"]);
              },
              error => {
                this.alertService.error(error.error.message);
              });

        },
        error => {
          this.alertService.error(error.error.message);

        });
  }


  allLoanDetail() {
    this.loan.loanDetail().
      subscribe(data => {
        //console.log(data);
        localStorage.setItem('allFormdata', JSON.stringify(data));
        //this.router.navigate(["/product"]);
      },
        error => {


        })

  }

}
