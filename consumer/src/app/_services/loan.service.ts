import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private http: HttpClient) { }

  AllLoanRef()
{
  return this.http.get<any>('/loan-x/')
  .pipe(map(ref => {
      return ref;
  }));
}

loanDetail()
{
  return this.http.get<any>('/loan-x/forms')
  .pipe(map(alldata => {
      return alldata;
  }));
}

proceed(loanReferenceNum:string,approvedByUser:number)
{
  return this.http.put<any>('/loan-x/request-loan',{loanReferenceNum:loanReferenceNum,approvedByUser:approvedByUser})
  .pipe(map(data => {
      return data;
  }));
}

decline(loanReferenceNum:string,approvedByUser:number)
{
  return this.http.put<any>('/loan-x/request-loan',{loanReferenceNum:loanReferenceNum,approvedByUser:approvedByUser})
  .pipe(map(data => {
      return data;
  }));
}



ibanValidate(iban:string)
{
return this.http.get<any>('/rest/iban/'+iban)
    .pipe(map(iban => {
      return iban;
    }));
}

}
