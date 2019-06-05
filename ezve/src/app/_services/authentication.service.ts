import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl=environment.baseUrl;

  constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.apiUrl+'/token/generate-token', { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                //console.log(user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

isLoggedIn()
{
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
    }
}
logout()
{
    localStorage.removeItem('currentUser');
    localStorage.clear();
    
}
    exp() {
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
        // return this.http.get('https://jsonplaceholder.typicode.com/posts', 
        // {headers: new HttpHeaders().set('Authorization', "token "+"tokendata")});
    }
}
