import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  apiUrl=environment.baseUrl;
  applicationId: string =localStorage.getItem("applicantionId");
  constructor(private http: HttpClient)
 { }

 setLocalStorage(name:string,value:string)
 {
   localStorage.setItem(name,value);
 }
}
