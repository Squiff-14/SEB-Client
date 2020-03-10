import { Message } from './../../models/message';
import { Observable, Subject, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Room } from '../../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  create(roomName: string): Observable<any> {
    var createdBy: string = decode(localStorage.getItem('token')).nameid;
    return this.http.post("/Room", { roomName, createdBy });
  }

  public getRooms(roomSearch: string): Observable<Room[]> {
    return this.http.get<Room[]>('/Room', { params: { roomSearch: roomSearch } });
  }

  public getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/Room/all');
  }

  public getLatestRoom(): Observable<Room> {
    return this.http.get<Room>('/Room/latest');
  }

  public joinRoom(roomId: number): Observable<any> {
    return this.http.put(`/Room`, { roomId: roomId });
  }
  
}
