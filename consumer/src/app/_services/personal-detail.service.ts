import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { DatePipe,formatDate  } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailService {

  constructor(private http: HttpClient) { }

  transformDate(date) {
    return formatDate(date, 'yyyy-MM-dd','en-in');
  }
  personalDataSave(formdata: any) {
    let visaexp :any=null;
    let passexp :any=null;

    if (formdata.eidExpDate) {
      visaexp = this.transformDate(formdata.eidExpDate);
    }
    if (formdata.passportExpDate) {
      passexp = this.transformDate(formdata.passportExpDate);
    }  
    return this.http.put<any>('/loan-x/kyc-details',
      {
        eidExpDate: this.transformDate(formdata.eidExpDate),
        passportExpDate: passexp,
        visaExpDate: visaexp,
        dob: this.transformDate(formdata.dob),
        email: formdata.email,
        emiratesId: formdata.emiratesId,
        firstName: formdata.firstName,
        gender: formdata.gender,
        lastName: formdata.lastName,
        maritalStatus: formdata.maritalStatus,
        middleName: formdata.middleName,
        mobile: formdata.mobile,
        nationality: formdata.nationality,
        passportNum: formdata.passportNum,
        title: formdata.title,
        uaeResidentialAddress: formdata.uaeResidentialAddress,
        visaId: formdata.visaId
      })
      .pipe(map(kyc => {
        return kyc;
      }));
  }
  AddressData(formdata: any) {
    return this.http.put<any>('/loan-x/address', formdata)
      .pipe(map(address => {
        return address;
      }));
  }

  employerdata(formdata: any) {
    return this.http.put<any>('/loan-x/employeer', formdata)
      .pipe(map(employer => {
        return employer;
      }));
  }

  bankdata(formdata: any) {
    return this.http.put<any>('/loan-x/bank', formdata)
      .pipe(map(bank => {
        return bank;
      }));
  }


applicantPersonalDetails(token:string)
{
  return this.http.get<any>('/ezverify/applicantpersonaldetails/'+token)
  .pipe(map(detail => {
    return detail;
  }));
}


}
