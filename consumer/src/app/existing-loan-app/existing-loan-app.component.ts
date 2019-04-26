import { LoanService } from './../_services/loan.service';
import { AlertService } from './../_services/alert.service';
import { LoginService } from './../_services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-existing-loan-app',
  templateUrl: './existing-loan-app.component.html',
  styleUrls: ['./existing-loan-app.component.css']
})
export class ExistingLoanAppComponent implements OnInit {
  existing_loan: FormGroup;
  isSubmitted: boolean = false;
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";
  redirect: string = null;
  constructor(private route: ActivatedRoute, private frmBuilder: FormBuilder, private http: HttpClient, private login: LoginService,
    private router: Router, private alert: AlertService, private loan: LoanService) { }

  ngOnInit() {

    this.existing_loan = this.frmBuilder.group({

      email: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), , Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    });
    this.redirect = this.route.snapshot.queryParams['redirect'] || '/product';
// console.log(this.redirect);
this.removeLocal();
  }


  get email() { return this.existing_loan.get('email'); }
  get password() { return this.existing_loan.get('password'); }



  getExistingApp() {
    this.isSubmitted = true;
    if (!this.existing_loan.valid)
      return;

    this.login.Existinglogin(this.existing_loan.value).
      subscribe(logindata => {
        // console.log(logindata);
        localStorage.setItem('currentUser', JSON.stringify(logindata));
        this.allLoanDetail();
        //this.router.navigate(["/my-application"]);

      },
        error => {
          if (error.error.status == 401) {
            //console.log("Invalid User Name password")
            this.alert.error("Invalid User Name or password")
          }
          else {
            this.alert.error("Something went wrong")
            //console.log(error.error.status)
          }

        })
  }
  removeLocal()
  {
      localStorage.removeItem('currentUser');
      localStorage.clear();
      
  }

  allLoanDetail() {
    this.loan.loanDetail().
      subscribe(data => {
        //console.log(data);
        localStorage.setItem('allFormdata', JSON.stringify(data));

        this.router.navigate([this.redirect]);

      },
        error => {


        })

  }

}
