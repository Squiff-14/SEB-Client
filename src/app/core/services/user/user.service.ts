import { Room } from './../../models/Room';
import { User } from './../../models/User';
import { AuthService } from './../authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getUsersRooms() {
    return this.http.get<Room[]>('/User/rooms');
  }

}
