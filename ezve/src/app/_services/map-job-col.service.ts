import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MapJobColService {
  colldata = new Array();
  constructor(private http: HttpClient) { }

  mapJobCol(formdata: any) {

    this.colldata.splice(0, this.colldata.length);
    for (var i = 0; i < formdata.coll.length; i++) {
      this.colldata.push(formdata.coll[i].collcode)
    }
    //console.log(this.colldata);
    return this.http.post<any>('/jobcollateralmap', { jobTypeCode: formdata.job, collateralCode: this.colldata })
      .pipe(map(col => {

        return col;
      }));
  }

  getAllColMap() {
    return this.http.get<any>('/jobcollateralmap')
      .pipe(map(colmap => {

        return colmap;
      }));
  }

  deleteJobColMap(jobid: string) {
    return this.http.delete<any>('/jobcollateralmap/' + jobid)
      .pipe(map(colmap => {

        return colmap;
      }));
  }

  getOneJobColMap(jobid:string)
  {
    return this.http.get<any>('/jobcollateralmap/' + jobid)
      .pipe(map(onecolmap => {

        return onecolmap;
      }));
  }

  updateJobColMap(formData: any) {
//console.log(formData);
this.colldata=[]
    for (var i = 0; i < formData.collateralCode.length; i++) {
      this.colldata.push(formData.collateralCode[i].collcode)
    }
    console.log(this.colldata)
    return this.http.put<any>('/jobcollateralmap', { jobTypeCode: formData.jobTypeCode, collateralCode: this.colldata })
      .pipe(map(updatecolmap => {

        return updatecolmap;
      }));
  }

}
