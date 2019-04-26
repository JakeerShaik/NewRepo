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
  return this.http.get<any>('/ezstartcor/typeofbuisness')
  .pipe(map(tob => {
      return tob;
  }));
 }

natureOfBusiness()
{
  return this.http.get<any>('/ezstartcor/natureofbuisness')
  .pipe(map(nob => {
      return nob;
  }));
}

OccupationLevel()
{
  return this.http.get<any>('/ezstartcor/occupation')  
  .pipe(map(occupation => {
      return occupation;
  }));
}

CountryList()
{
  return this.http.get<any>('/ezverify/countries')  
  .pipe(map(countries => {
      return countries;
  }));
}
Regions(id:any)
{
  return this.http.get<any>('/ezstartcor/regions/'+id)  
  .pipe(map(regions => {
      return regions;
  }));
}

Cities(id:string)
{
  return this.http.get<any>('/ezstartcor/cities'+id)  
  .pipe(map(regions => {
      return regions;
  }));

}


bankName()
{
  return this.http.get<any>('/ezstartcor/bankdetails')  
  .pipe(map(bank => {
      return bank;
  }));

}

loanReasonCat()
{
  return this.http.get<any>('/ezverify/loanreasoncategory')  
  .pipe(map(cat => {
      return cat;
  }));
}

loanReasonSubCat(id:string)
{
  return this.http.get<any>('/ezverify/loanreasonsubcategory/'+id)  
  .pipe(map(subcat => {
      return subcat;
  }));
}



}
