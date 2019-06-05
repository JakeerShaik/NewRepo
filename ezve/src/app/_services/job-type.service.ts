import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(private http: HttpClient) { }
  getAllJobType() {
    //console.log(formdata.code);
    return this.http.get<any>('/jobtype/getAllJobType')
        .pipe(map(AlljobType => {
        
          return AlljobType;
        }));
  }
getoneJobtype(jobtype:string)
{
  return this.http.get<any>('/jobtype/'+jobtype)
        .pipe(map(onejobType => {
        
          return onejobType;
        }));
}

  getAllJobTypeName() {
    //console.log(formdata.code);
    return this.http.get<any>('/jobtype/jobtypename')
        .pipe(map(jobTypeName => {
        
          return jobTypeName;
        }));
  }


  createJobtype(formData:any)
  {

    return this.http.post<any>('/jobtype/create',{jobTypeCode:formData.code,jobTypeName:formData.name,jobTypeSla:formData.sla})
    .pipe(map(JobTypeCreated => {
    
      return JobTypeCreated;
    }));
  }

  editJobtype(formdata:any)
  {
    return this.http.put<any>('/jobtype/updatejob',{jobTypeCode:formdata.editcode,jobTypeName:formdata.editname,jobTypeSla:formdata.editsla})
    .pipe(map(updatejobType => {
    
      return updatejobType;
    }));
  }
}
