import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  constructor(private http: HttpClient)
 { }


 TypeOfBusiness()
 {
  return this.http.get<any>('/typeofbuisness')
  .pipe(map(tob => {
      return tob;
  }));
 }

natureOfBusiness()
{
  return this.http.get<any>('/natureofbuisness')
  .pipe(map(nob => {
      return nob;
  }));
}

OccupationLevel()
{
  return this.http.get<any>('/occupation')  
  .pipe(map(occupation => {
      return occupation;
  }));
}

CountryList()
{
  return this.http.get<any>('/countries')  
  .pipe(map(countries => {
      return countries;
  }));
}

Regions(id:string)
{
  return this.http.get<any>('/regions'+id)  
  .pipe(map(regions => {
      return regions;
  }));
}

Cities(id:string)
{
  return this.http.get<any>('/cities'+id)  
  .pipe(map(regions => {
      return regions;
  }));

}

loanReason()
{
  return this.http.get<any>('/reasonforloan')  
  .pipe(map(reason => {
      return reason;
  }));

}

emirateCity()
{
   return this.http.get<any>('/countriessubdivision/AE')  
  .pipe(map(emirate => {
      return emirate;
  })); 
}

bankName()
{
   return this.http.get<any>('/bankdetails')  
  .pipe(map(bank => {
      return bank;
  })); 
}


}
