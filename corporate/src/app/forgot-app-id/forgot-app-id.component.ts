import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-forgot-app-id',
  templateUrl: './forgot-app-id.component.html',
  styleUrls: ['./forgot-app-id.component.css']
})
export class ForgotAppIDComponent implements OnInit {
  forgot_app_id: FormGroup;
  isSubmitted: boolean = false;

  constructor(private frmBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.forgot_app_id = this.frmBuilder.group({
     
      applicantEmailId: ["", [Validators.required, Validators.minLength(3),Validators.maxLength(100),Validators.email]]
      
    });
  }


  get applicantEmailId() { return this.forgot_app_id.get('applicantEmailId'); }
}
