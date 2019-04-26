import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }



  LoanDetails(applicationId:any,applicantLoanReason:number,applicantLoanAmount:number,
    applicantLoanTerm:number,applicantSubLoanReason:string) {
    return this.http.post<any>('/submitbasicloandetails', {applicationId:applicationId,applicantLoanReason:applicantLoanReason,applicantLoanAmount:applicantLoanAmount,
      applicantLoanTerm:applicantLoanTerm,applicantSubLoanReason:applicantSubLoanReason} )
        .pipe(map(loan => {
            return loan;
        }));
  }

  getAmtBank(appId:string) {
    return this.http.get<any>('/loandetails/'+appId)
        .pipe(map(loanDetail => {
            return loanDetail;
        }));
  }

  bankDetailSave(formData:any)
  {
    return this.http.post<any>('/submitaccountloandetails',formData)
    .pipe(map(bankdata => {
        return bankdata;
    }));
  }


  productDetail() {
    return this.http.get<any>('/productdetails/SAMA/1')
        .pipe(map(product => {
            return product;
        }));
  }

  loanMaxMinTermAmt() {
    return this.http.get<any>('/amountrange/SAMA/1')
        .pipe(map(term => {
            return term;
        }));
  }

  loanTerm(amount:any)
  {
    return this.http.get<any>('/loanterm/1/'+amount)
    .pipe(map(loanTerm => {
        return loanTerm;
    }));
  }

  finalSubmit(appId:any)
  {
    return this.http.post<any>('/submitloanapplication',{applicationId:appId})
    .pipe(map(finalSub => {
        return finalSub;
    }));
  }


}
