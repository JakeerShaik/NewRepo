import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JobReallocationService {

  constructor(private http: HttpClient) { }

  getAllReassigningJob()
  {
    return this.http.get<any>('/agentjobmapping/getAllReassigningJob' )
    .pipe(map(data => {
    
      return data;
    }));
  }

  mapAgentJob(formdata:any)
  {
    return this.http.put<any>('/agentjobmapping/reallocatejob',{jobReference:formdata.jobid,existingAgentCode:formdata.existingAgentCode,
      newAgentCode:formdata.agentid,} )
    .pipe(map(data => {
    
      return data;
    }));
  }
}
