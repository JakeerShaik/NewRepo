import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HomedataService {

  constructor(private http: HttpClient) { }


  countData()
  {
    return this.http.get<any>('/agentjobmapping/jobcount' )
    .pipe(map(allcounted => {
    
      return allcounted;
    }));
  }
}
