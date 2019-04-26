import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient)
 { }

 Login(formData:any) {
  return this.http.post<any>('/login',  formData)
      .pipe(map(user => {
          return user;
      }));
}

resetPassword(formData:any) {
  return this.http.post<any>('/resetpassword',  formData)
      .pipe(map(pass => {
          return pass;
      }));
}

forgotPassword(formData:any) {
  return this.http.get<any>('/forgotpassword/'+formData.applicantEmailId)
      .pipe(map(pass => {
          return pass;
      }));
}

}
