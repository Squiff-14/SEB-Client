import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({ url: environment.apiUrl + `${req.url}`});
    
    const jwt = localStorage.getItem('id_token');
    if (jwt) {
      cloneReq.headers.set("Authorization", `Bearer ${jwt}`)
      return next.handle(cloneReq);
    }

    else {
      return next.handle(cloneReq);
    }
  }
}