import { PassMatch } from './../pass-match';
import { ForgotPasswordService } from './../_services/forgot-password.service';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  reset_password: FormGroup;
  isSubmitted: boolean = false;

  constructor(private frmBuilder: FormBuilder, private http: HttpClient, private alert: AlertService,
     private forgot: ForgotPasswordService, private router: Router) { }

  ngOnInit() {
    this.reset_password = this.frmBuilder.group({

      otp: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      applicantionId: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100),]],
      applicantPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPass: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    },
    {
      validator: PassMatch.Match("applicantPassword","confirmPass")
    })

    this.emailFetch();
  }

  get otp() { return this.reset_password.get('otp'); }
  get applicantionId() { return this.reset_password.get('applicantionId'); }
  get applicantPassword() { return this.reset_password.get('applicantPassword'); }
  get confirmPass() { return this.reset_password.get('confirmPass'); }


  changePassword() {
    this.isSubmitted = true;
    if (!this.reset_password.valid)
      return;
    this.forgot.changePassword(this.reset_password.value).
      subscribe(data => {
         console.log(data);
        if (data.statuscode == 404) {
          this.alert.error(data.message);

        } else {
          this.alert.success("Password Succesfully Changed, Redirecting to Login");
          setTimeout(() => {
           this.router.navigate(["/existing-loan-app"]);

          }, 2000);

        }

      },
        error => {
          this.alert.error("Something Went Wrong");

          //  console.log(error);
        })
  }

emailFetch()
{
  let email=JSON.parse(localStorage.getItem('email'))
if(email)
{
  this.reset_password.get('applicantionId').setValue(email.applicantionId);

}
}

}
