import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    var cloneReq = req.clone({ url: environment.apiUrl + `${req.url}` });

    const jwt = JSON.parse(localStorage.getItem('token'));
    if (jwt) {
     cloneReq = cloneReq.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt.token}`
        }
      });
      return next.handle(cloneReq);
    }

    else {
      return next.handle(cloneReq);
    }
  }
}