import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-myapp-id',
  templateUrl: './view-myapp-id.component.html',
  styleUrls: ['./view-myapp-id.component.css']
})
export class ViewMyappIdComponent implements OnInit {
  view_my_app: FormGroup;
  isSubmitted: boolean = false;

  constructor(private frmBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.view_my_app = this.frmBuilder.group({

      otp: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      applicantEmailId: ["", [Validators.required, Validators.minLength(5),Validators.maxLength(100),]],
     

    });
  }

  get otp() { return this.view_my_app.get('otp'); }
  get applicantEmailId() { return this.view_my_app.get('applicantEmailId'); }
}
