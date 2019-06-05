import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }


  JobHistory(jobid:string) {
    return this.http.get<any>('/jobhistory/'+jobid)
      .pipe(map(allhistory => {

        return allhistory;
      }));
  }
}
