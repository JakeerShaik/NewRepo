import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CollateralService {

  constructor(private http: HttpClient) { }

  createCollateral(code: string, name: string) {
    //console.log(formdata.code);
    return this.http.post<any>('/collateral', {collcode:code,collName:name} )
        .pipe(map(col => {
        
          return col;
        }));
}


getOneColl(collcode:string)
{
  return this.http.get<any>('/collateral/'+collcode )
  .pipe(map(onecoll => {
  
    return onecoll;
  }));
}


getAllCollateral() {
  //console.log(formdata.code);
  return this.http.get<any>('/collateral')
      .pipe(map(allcol => {
      
        return allcol;
      }));
}

deleteCollateral(code:string) {
  //console.log(formdata.code);
  return this.http.delete<any>('/collateral/'+code)
      .pipe(map(delcol => {
      
        return delcol;
      }));
}

updateColl(formdata:any)
{
  return this.http.put<any>('/collateral/',formdata)
  .pipe(map(updatecol => {
  
    return updatecol;
  }));
}

}
