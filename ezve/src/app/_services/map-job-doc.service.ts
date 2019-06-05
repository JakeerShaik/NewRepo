import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MapJobDocService {
 docdata = new Array(); 

  constructor(private http: HttpClient) { }

  mapJobDoc(formdata: any) {
    // console.log(formdata);

    this.docdata.splice(0, this.docdata.length);
    for (var i = 0; i < formdata.doc.length; i++) {
      this.docdata.push(formdata.doc[i].docCode)
    }
    //console.log(this.docdata);
    return this.http.post<any>('/jobdocumentmap', { jobTypeCode: formdata.job, documentCode: this.docdata })
      .pipe(map(doc => {

        return doc;
      }));
  }

getAllDocMap()
{
  return this.http.get<any>('/jobdocumentmap')
  .pipe(map(docmap => {
  
    return docmap;
  }));
}




updateJobDocMap(formdata: any) {
 //  console.log(formdata);
  this.docdata.splice(0, this.docdata.length);
  for (var i = 0; i < formdata.documentCode.length; i++) {
    this.docdata.push(formdata.documentCode[i].docCode)
  }
  //console.log(this.docdata);
  return this.http.put<any>('/jobdocumentmap', { jobTypeCode: formdata.jobTypeCode, documentCode: this.docdata })
    .pipe(map(doc => {

      return doc;
    }));
}


getOneJobDocMap(jobid:string)
{
  return this.http.get<any>('/jobdocumentmap/' + jobid)
    .pipe(map(onedocmap => {

      return onedocmap;
    }));
}

deleteJobDocMap(jobid:string)
{
  return this.http.delete<any>('/jobdocumentmap/' + jobid)
  .pipe(map(deletedocmap => {

    return deletedocmap;
  }));
}

}
