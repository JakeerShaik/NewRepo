import { LoginService } from './../_services/login.service';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { PassMatch } from './../pass-match';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  reset_password: FormGroup;
  isSubmitted: boolean = false;
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private alert: AlertService, private login: LoginService) { }

  ngOnInit() {
    this.reset_password = this.frmBuilder.group({
      otp: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      applicantEmailId: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(this.emailPattern)]],
      newPassword: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPass: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    },
      {
        validator: PassMatch.Match("newPassword", "confirmPass")
      });
    this.emailFetch();
  }



  get otp() { return this.reset_password.get('otp'); }
  get applicantEmailId() { return this.reset_password.get('applicantEmailId'); }
  get newPassword() { return this.reset_password.get('newPassword'); }
  get confirmPass() { return this.reset_password.get('confirmPass'); }

  resetPass() {
    this.alert.removeAlert();
    this.isSubmitted = true;

    if (!this.reset_password.valid)
      return;
    this.login.resetPassword(this.reset_password.value).
      subscribe(data => {

        // console.log(data);
        this.alert.success(data.statusMessage);
        localStorage.clear();
        this.isSubmitted = false;
        this.reset_password.reset();
      },
        error => {
          this.alert.error(error.error.statusMessage);
          // console.log(error.error.statusMessage)
        })
  }

  emailFetch() {
    let email = JSON.parse(localStorage.getItem('email'))
    if (email) {
      this.reset_password.get('applicantEmailId').setValue(email);

    }
  }


}
