import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email:string,password:string)
{
  return this.http.post<any>('/loan/applicant-login',{email:email,password:password})
  .pipe(map(login => {
      return login;
  }));
}
Existinglogin(formdada:any)
{
  return this.http.post<any>('/loan/applicant-login',formdada)
  .pipe(map(login => {
      return login;
  }));
}



}
