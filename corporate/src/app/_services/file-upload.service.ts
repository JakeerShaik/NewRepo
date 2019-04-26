import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }


  AllUploadedFile(appId:string) {
    return this.http.get<any>('/filedetails/'+appId )
        .pipe(map(data => {
            return data;
        }));
  }

  shareholderDocWithNationality(appId:string) {
    return this.http.get<any>('/form2/'+appId )
        .pipe(map(data => {
            return data;
        }));
  }


  submitBankStatment(data:any) {
    return this.http.post<any>('/financialform',data )
        .pipe(map(response => {
            return response;
        }));
  }

  
  submitShareHolderFile(data:any) {
    return this.http.post<any>('/docuploadformsubmit',data )
        .pipe(map(file => {
            return file;
        }));
  }

  updateShareholderCount (Appid:string,noofshare:number) {
    return this.http.post<any>('/updateshareholdercount ',{applicationId:Appid,noOfShareholders:noofshare} )
        .pipe(map(count => {
            return count;
        }));
  }


}
