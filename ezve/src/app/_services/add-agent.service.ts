
import { Injectable } from '@angular/core';

import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';

// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AddAgentService {

  constructor(private http: HttpClient) { }
  
  createAgent(formdata:any) {
    //console.log(formdata.code);
    return this.http.post<any>('/agent/create', {agentCode:formdata.code,agentName:formdata.name,agentMobile:formdata.mobile,agentEmail:formdata.email} )
        .pipe(map(agent => {
        
          return agent;
        }));
}


deleteAgent(agentcode:string)
{
  return this.http.delete<any>('/agent/'+agentcode )
  .pipe(map(agent => {
  
    return agent;
  }));
}

getAllAgent()
{
  //return this.http.get<any>('https://jsonplaceholder.typicode.com/posts' )

  return this.http.get<any>('/agentjobmapping/getAgent' )
  .pipe(map(allagent => {
  
    return allagent;
  }));
}

getOneAgent(agentcode:string)
{
  return this.http.get<any>('/agent/'+agentcode )
  .pipe(map(oneagent => {
  
    return oneagent;
  }));
}

updateAgent(agentdata:any) 
{
  // console.log({agentdata});
  return this.http.put<any>('/agent/update',agentdata)
  .pipe(map(editagent => {
  
    return editagent;
  }));
}

}
