import { WebSocketService } from 'src/app/core/services/web-sockets/web-socket.service';
import { Router, Route } from '@angular/router';
import { User } from './../../models/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private wsService: WebSocketService) { }

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  public login(username: string, password: string) {
    return this.http.post<any>('/Authentication/login', { username, password }) //{withCredentials: true}
      .pipe(map(token => {
        localStorage.setItem('token', JSON.stringify(token));
        this.isLoggedInSubject.next(true);
        return token;
      }))
  }

  public logout() {
    localStorage.removeItem('token');
    this.wsService.close();
    this.isLoggedInSubject.next(false);
  }

  public hasToken(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  }

  public currentUser(): User {
    if (localStorage.getItem('token')) {
      var jwt = decode(localStorage.getItem('token'));
      return {
        userId: +jwt.nameid,
        username: jwt.unique_name
      }
    } else{
      return null;
    }
  }

  public register(newUser: any): Observable<any> {
    return this.http.post('/Authentication/register', newUser);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public getToken() {
    const token = JSON.stringify(localStorage.getItem('token'))
    if (token) {
      return token
    }
    this.logout();
  }

}
