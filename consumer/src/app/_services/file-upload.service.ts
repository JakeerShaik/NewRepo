import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }


  UploadedFileDetail()
{
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let token=currentUser.tokenKey;
  return this.http.get<any>('/ezverify/applicantfiledetails/'+token)  
  .pipe(map(fileDetail => {
      return fileDetail;
  }));
}
}
