import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicDetailsService {
  apiUrl=environment.baseUrl;
  constructor(private http: HttpClient)
 { }
registerapplicant(formdata:any)
{
  let source=localStorage.getItem("source")
  // console.log(source);
  // firstName:formdata.firstName,lastName:formdata.lastName,
  return this.http.post<any>('/loan/applicant-account',{
    email:formdata.applicantEmailId,password:formdata.applicantPassword,sourcingChannel:source})
  .pipe(map(register => {
      return register;
  }));
}

}
