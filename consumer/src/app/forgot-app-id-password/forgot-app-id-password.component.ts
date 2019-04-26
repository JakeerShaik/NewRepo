import { Router } from '@angular/router';
import { AlertService } from './../_services/alert.service';
import { ForgotPasswordService } from './../_services/forgot-password.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forgot-app-id-password',
  templateUrl: './forgot-app-id-password.component.html',
  styleUrls: ['./forgot-app-id-password.component.css']
})
export class ForgotAppIdPasswordComponent implements OnInit {
  forgot_app_pass: FormGroup;
  isSubmitted: boolean = false;
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private forgot: ForgotPasswordService, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.forgot_app_pass = this.frmBuilder.group({

      applicantionId: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), , Validators.pattern(this.emailPattern)]]

    });
    this.removeLocal();
  }

  get applicantionId() { return this.forgot_app_pass.get('applicantionId'); }


  sendOTPEmail() {
    this.isSubmitted = true;
    if (!this.forgot_app_pass.valid)
      return;
    this.forgot.sendOtpEmail(this.forgot_app_pass.value).
      subscribe(data => {
        // console.log(data);
        if (data.statuscode == 404) {
          this.alert.error(data.message);

        } else {
          this.alert.success("OTP Sent To your Email Id, Redirecting to reset Password");
          setTimeout(() => {
            localStorage.setItem('email', JSON.stringify(this.forgot_app_pass.value));

            this.router.navigate(["/reset-password"]);

          }, 2000);
        }

      },
        error => {
          this.alert.error("Something Went Wrong");

          //  console.log(error);
        })
  }
  removeLocal() {
    localStorage.removeItem('currentUser');
    localStorage.clear();

  }

}
