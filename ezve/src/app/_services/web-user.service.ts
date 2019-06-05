import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class WebUserService {

  constructor(private http: HttpClient) { }

  createWebUser(formdata:any) {
    console.log(formdata);
    return this.http.post<any>('user-creat', formdata )
        .pipe(map(user => {
          return user;
        }));
}
}
