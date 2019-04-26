import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  sendOtpEmail(formData:any)
  {
   return this.http.post<any>('/loan/sendemailotp',{email:formData.applicantionId})
   .pipe(map(otp => {
       return otp;
   }));
  }

  changePassword(formData:any)
  {
   return this.http.post<any>('/loan/validatemaileotp',{email:formData.applicantionId,otpcode:formData.otp,password:formData.applicantPassword})
   .pipe(map(otp => {
       return otp;
   }));
  }

  
}
