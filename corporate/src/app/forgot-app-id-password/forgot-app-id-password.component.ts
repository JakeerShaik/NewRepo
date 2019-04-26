import { Router } from '@angular/router';
import { LoginService } from './../_services/login.service';
import { AlertService } from './../_services/alert.service';
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
    private alert:AlertService,private login:LoginService,private router: Router) { }

  ngOnInit() {
    this.forgot_app_pass = this.frmBuilder.group({
   
      applicantEmailId: ["", [Validators.required, Validators.minLength(3),Validators.maxLength(100),Validators.pattern(this.emailPattern)]]
  
    });
  }



  get applicantEmailId() { return this.forgot_app_pass.get('applicantEmailId'); }


  forgotPass() {
    this.alert.removeAlert();
    this.isSubmitted = true;

    if (!this.forgot_app_pass.valid)
      return;
    this.login.forgotPassword(this.forgot_app_pass.value).
      subscribe(data => {

        console.log(data);
        // this.router.navigate(['/loan-amount']);
        this.alert.success("OTP Sent To your Email Id, Redirecting to reset Password");
          setTimeout(() => {
            localStorage.setItem('email', JSON.stringify(this.applicantEmailId.value));

            this.router.navigate(["/reset-password"]);

          }, 2000);


      },
        error => {
           this.alert.error(error.error.statusMessage);
          console.log(error.error.statusMessage)
        })
  }

}
