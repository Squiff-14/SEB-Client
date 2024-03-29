import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(request).pipe(catchError(err => {
            if(err.status === 401){
                this.authService.logout();
                this.router.navigate(['/login']);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
