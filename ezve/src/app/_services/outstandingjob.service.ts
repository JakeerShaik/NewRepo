import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';

// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OutstandingjobService {

  constructor(private http: HttpClient) { }


  getAllOustandingJob()
{
  return this.http.get<any>('/agentjobmapping/getAllPendingJob' )
  .pipe(map(allOutstnadingJob => {
  
    return allOutstnadingJob;
  }));
}

getAllCompletedJob()
{
  return this.http.get<any>('/agentjobmapping//completedJobDetails' )
  .pipe(map(allCompletedgJob => {
  
    return allCompletedgJob;
  }));
}


getPendingJob()
{
  return this.http.get<any>('/agentjobmapping/peningJobDetails' )
  .pipe(map(allPendingJob => {
  
    return allPendingJob;
  }));
}

}
