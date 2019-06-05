import { WebUserService } from './../_services/web-user.service';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms' 



@Component({
  selector: 'app-web-user',
  templateUrl: './web-user.component.html',
  styleUrls: ['./web-user.component.css']
})
export class WebUserComponent implements OnInit {
  user: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  constructor(private frmBuilder: FormBuilder,private http: HttpClient,private webuser:WebUserService) { }
 
  ngOnInit() {
    this.user = this.frmBuilder.group({
      name:["", [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      username:["", [Validators.required,Validators.minLength(3),Validators.maxLength(32)]],
      password:["", [Validators.required,Validators.minLength(6),Validators.maxLength(32)]],
      cpassword:["", [Validators.required,Validators.minLength(6),Validators.maxLength(32)]],
      usertype:["", [Validators.required]]
    });
  }

  get username() { return this.user.get('username');}
  get name() { return this.user.get('name');}
  get password() { return this.user.get('password');}
  get cpassword() { return this.user.get('cpassword');}
  get usertype() { return this.user.get('usertype');}

  save(){
    this.isSubmitted = true;
    if(!this.user.valid)
        return;
        //console.log("form Submited");
    // Code to save the data
    // userService.Save(this.user.value);
    this.result = this.user.value;
    this.webuser.createWebUser(this.user.value)
    .subscribe(user=>
    {

    }
  )
  //console.log(this.result);
    //  setTimeout(()=> {
    //   this.result = null;
    //   this.reset();
    //  }, 2000);
  }
  
  reset(){
    this.isSubmitted = false;
    this.user.reset();
    
  }
  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
    }
  }
}
