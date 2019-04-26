import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DatePipe,formatDate  } from '@angular/common';

// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {
  Reference:any=null;
  lndmekycLoanType=[];
  constructor(private http: HttpClient) {
 
  // console.log(this.Reference);
   }
   transformDate(date) {
    return formatDate(date, 'yyyy-MM-dd','en-in');
  }

  appoinment(formdata:any)
{
  this.Reference=null;
  this.lndmekycLoanType=[];
    this.Reference=JSON.parse(localStorage.getItem('lendmeloan'))
   this.lndmekycLoanType=JSON.parse(localStorage.getItem('productselected'));


  return this.http.post<any>('/loan-x/request-appointment',{lndmekycLoanReference:this.Reference.lndmeloanReference,
    lndmekycLoanType:this.lndmekycLoanType
  ,lndmekycSchedulefromDate:this.transformDate(formdata.fromDate),
  lndmekycScheduletoDate:this.transformDate(formdata.toDate),
  lndmekycSchedulefromtime:formdata.fromTime,
  lndmekycScheduletotime:formdata.toTime,
  location:formdata.location,
  bankCode:1})
  .pipe(map(appoinment => {
      return appoinment;
  }));
}
}
