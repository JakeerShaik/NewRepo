import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductWithQuotationService {

constructor(private http: HttpClient) { }

  
productData()
{
  return this.http.post<any>('/rest/loanrangeamount',{ bankcode:1, languagecode: "eng"})
  .pipe(map(product => {
      return product;
  }));
}

quotationData(instalmentto:number,loanamount:number,producttypecode:string)
{
  return this.http.post<any>('/loan/productdetails',{currentdate: "",instalmentfrom: 0,
  instalmentto:instalmentto,loanamount:loanamount,producttypecode:producttypecode })
  .pipe(map(quot => {
      return quot;
  }));
}


loanSubmit(loanAmt:any,emi:any,repay:any,productCode:any,term:any,interest:any,cat:number,subcat:any)
{
  return this.http.post<any>('/loan-x/request-loan',{
    loanRequest:{},
    lendmeloan: {
    lndme_loanCcy:"AED",
    lndmeloanAmount:loanAmt,
    totalloanamount:repay,
    lndmeloanType:productCode,
    loanterm:term,
    interestrate:interest,
    loan_emi:emi,
    loanReasonCategoryId:cat,
    loanReasonSubCategory:subcat
  }
}
)
  .pipe(map(quot => {
      return quot;
  }));
}


}
