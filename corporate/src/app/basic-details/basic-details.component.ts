import { PassMatch } from './../pass-match';
import { LocalStorageService } from './../_services/local-storage.service';
import { AlertService } from './../_services/alert.service';
import { Router } from '@angular/router';
import { BasicDetailsService, } from './../_services/basic-details.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {
  Form_basic_detail: FormGroup;
  isSubmitted: boolean = false;
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";

  constructor(private localstore: LocalStorageService, private alertService: AlertService, private router: Router, private frmBuilder: FormBuilder, private http: HttpClient, private basicService: BasicDetailsService) { }

  ngOnInit() {


    this.Form_basic_detail = this.frmBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      applicantEmailId: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(this.emailPattern)]],
      applicantPassword: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^0[0-9]*$")]],
      companyName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      confirmPass: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      applicantionId: [""],
      applicantControlType: ["SAMA Corporate"]
    },
      {
        validator: PassMatch.Match("applicantPassword", "confirmPass")
      });



    // if (!JSON.parse(localStorage.getItem("CurrApp"))) {
    //   this.router.navigate(['/home']);

    // }
  }

  get firstName() { return this.Form_basic_detail.get('firstName'); }
  get lastName() { return this.Form_basic_detail.get('lastName'); }
  get mobileNumber() { return this.Form_basic_detail.get('mobileNumber'); }
  get companyName() { return this.Form_basic_detail.get('companyName'); }
  get applicantEmailId() { return this.Form_basic_detail.get('applicantEmailId'); }
  get applicantPassword() { return this.Form_basic_detail.get('applicantPassword'); }
  get confirmPass() { return this.Form_basic_detail.get('confirmPass'); }
  get applicantionId() { return this.Form_basic_detail.get('applicantionId'); }
  get applicantControlType() { return this.Form_basic_detail.get('applicantControlType'); }

  save() {
    this.isSubmitted = true;

    if (!this.Form_basic_detail.valid)
      return;
    // console.log(event);

    this.basicService.registerapplicant(this.Form_basic_detail.value).
      subscribe(data => {

        // console.log(data);
        this.router.navigate(['/loan-amount']);

      },
        error => {
          this.alertService.error(error.error.statusDetails.statusMessage);
          console.log(error)
        })

  }

  registerApplicant() {
    this.isSubmitted = true;

    if (!this.Form_basic_detail.valid)
      return;
    this.basicService.generateAppid().
      subscribe(data => {
        // localStorage.setItem("CurrApp", JSON.stringify( data.applicationId.applicationId))
        localStorage.setItem("CurrApp", JSON.stringify(data.applicationId.applicationId))
        this.Form_basic_detail.get('applicantionId').setValue(data.applicationId.applicationId);
        this.save();
      },
        error => {
          this.alertService.error(error.error);
          //console.log(error.error)
        })

  }


}
