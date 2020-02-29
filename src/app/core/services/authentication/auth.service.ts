import { User } from './../../models/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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

  public currentUser(): User {
    var jwt = decode(localStorage.getItem('token'));
    return {
      userId: +jwt.nameid,
      username: jwt.unique_name
    }
  }

  public isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

}
