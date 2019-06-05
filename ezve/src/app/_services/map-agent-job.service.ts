import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MapAgentJobService {
  jobdata = new Array();

  constructor(private http: HttpClient) { }

  getAllAgent() {
    return this.http.get<any>('/agent/list')
      .pipe(map(allagent => {

        return allagent;
      }));
  }

  getAllJobAssignedJobs() {
    return this.http.get<any>('/agentjobmapping/getallAssignedJobs')
      .pipe(map(allJob => {

        return allJob;
      }));
  }
  getAllPendingJob() {
    return this.http.get<any>('/agentjobmapping/getAllPendingJob')
      .pipe(map(allpendingJob => {

        return allpendingJob;
      }));
  }

  mapAgentJob(formdata: any) {
    //console.log(formdata.agentid);
    this.jobdata.splice(0, this.jobdata.length);
    if (formdata.outstanding) {
      this.jobdata.push(formdata.jobid)
      // console.log(this.jobdata)
    }
    else {
      for (var i = 0; i < formdata.jobid.length; i++) {
        this.jobdata.push(formdata.jobid[i])
      }
    }

    //console.log(this.colldata);
    return this.http.post<any>('/agentjobmapping/create', { agentCode: formdata.agentid, jobReferencenumber: this.jobdata })
      .pipe(map(job => {

        return job;
      }));
  }

  getOneJobDetail(jobid: string) {
    return this.http.get<any>('/agentjobmapping/getJobDetailsByJobRef/' + jobid)
      .pipe(map(onejobdetail => {

        return onejobdetail;
      }));
  }
}
