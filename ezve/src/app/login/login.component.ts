import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit, Directive, ElementRef, Renderer  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  loginform: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, private frmBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.loginform = this.frmBuilder.group({

      username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]

    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.logout();
  }

  login() {
    this.result="";
    this.isSubmitted = true;
    if (!this.loginform.valid)
      return;
    this.loading = true;
    // console.log("form submited");
    this.authenticationService.login(this.username.value, this.password.value)
      .subscribe(
        data => {
         // console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          //  console.log(error);
          if (error.status == 401) {
            this.result = "Invalid Username Or Password"
            this.loading = false;
          }
          else {
            this.result = "Oops Something Went Wrong (error Code "+error.status+")";
            this.loading = false;

          }
          // console.log(error);
        });
  }

  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/login']);

  }
  get username() { return this.loginform.get('username'); }
  get password() { return this.loginform.get('password'); }


}




@Directive({ selector: '[preventCutCopyPaste]' })

export class CopyDirective {
    constructor(el: ElementRef, renderer: Renderer) {
      var events = 'cut copy paste';
      events.split(' ').forEach(e => 
      renderer.listen(el.nativeElement, e, (event) => {
        event.preventDefault();
        })
      );
    
    }
}
