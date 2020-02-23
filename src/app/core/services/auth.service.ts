import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

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
    this.isLoggedInSubject.next(false);
  }

  public hasToken(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  }

  public currentUser(): number {
    return +decode(localStorage.getItem('token')).nameid;
  }

  public isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

}
