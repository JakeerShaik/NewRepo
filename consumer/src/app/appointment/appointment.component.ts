import { AppoinmentService } from './../_services/appoinment.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { AlertService } from './../_services/alert.service';
import { IMyDpOptions } from 'mydatepicker';
import { formatDate } from '@angular/common';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appoinmentForm: FormGroup;
  isSubmitted: boolean = false;
  public min: any = null;
  public tomin: any = null;
  month: any;
  day: any;
  year: any;

  today = new Date();
  jstoday: any;

  constructor(private alertService: AlertService, private router: Router,
    private frmBuilder: FormBuilder, private http: HttpClient, private appoinment: AppoinmentService) {
    this.jstoday = formatDate(this.today, 'dd', 'en-US');


  }

  ngOnInit() {

    this.appoinmentForm = this.frmBuilder.group({
      fromDate: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      toDate: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      fromTime: ["", [Validators.required, Validators.minLength(3)]],
      toTime: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      location: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

    });
    this.year = this.today.getFullYear()
    this.month = this.today.getMonth() + 1

    this.min = new Date(this.year, this.month - 1, this.jstoday-1, 10, 30);
    this.tomin = this.min;
    this.datechange();
  }

  datechange() {
    this.appoinmentForm.valueChanges.subscribe(
      (mode: string) => {
        this.tomin = this.appoinmentForm.get('fromDate').value;
    
      })
  }

  // fromChange()
  // {
  //   this.appoinmentForm.get('toDate').setValue("");

  // }

  get fromDate() { return this.appoinmentForm.get('fromDate'); }
  get toDate() { return this.appoinmentForm.get('toDate'); }
  get fromTime() { return this.appoinmentForm.get('fromTime'); }
  get toTime() { return this.appoinmentForm.get('toTime'); }
  get location() { return this.appoinmentForm.get('location'); }



  save() {
    // alert("ss")
    this.isSubmitted = true;
    if (!this.appoinmentForm.valid)
      return;
    this.appoinment.appoinment(this.appoinmentForm.value).
      subscribe(
        data => {

          //  console.log(data)
          this.router.navigate(["/thank-you"]);

        },
        error => {
          console.log(error);
          this.alertService.error(error.error.response.description);

        });
  }


}
