
import { LoaderService } from './_services/loader.service';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgIf } from '@angular/common';


@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
    auth: any;

    constructor(private route: ActivatedRoute,
        private router: Router, private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        this.showLoader();

        let baseurl = "";
        let reqUrl = "";
        let token="";
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.tokenKey) {
        token=currentUser.tokenKey;
        }
        var re = "ezstartcor";
        var str = request.url;
        if (str.search(re) == 1) {
            baseurl = environment.baseUrl2;
            reqUrl = request.url.replace("ezstartcor/", "");
            request = request.clone({
                url: baseurl + reqUrl,
                setHeaders: {
                  //   'Content-Type': 'application/json',
                //  "content-type": "multipart/form-data"
                }
            });

        }else if(str.search("ezverify") == 1)
        {
            baseurl = environment.baseUrl3;
            reqUrl = request.url.replace("ezverify/", "");
            request = request.clone({
                url: baseurl + reqUrl,
                setHeaders: {
                    // 'Content-Type': 'application/json'
                }
            });
        }
         else {
            baseurl = environment.baseUrl;
            reqUrl = request.url;
            // console.log(token)
            request = request.clone({
                url: baseurl + reqUrl,
                setHeaders: {
                  'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        //  console.log(currentUser);

        // }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.onEnd();
            }
        },
            (err: any) => {
                this.onEnd();
            }));
    }


    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }
}
