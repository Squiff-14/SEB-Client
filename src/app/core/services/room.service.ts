import { Observable, Subject, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoomService {


constructor(private http: HttpClient) { }

getRooms() : Observable<any> {
  return this.http.get("/Room");
}

create(roomName: string) : Observable<any> {
  var createdBy : string = decode(localStorage.getItem('token')).nameid;
  return this.http.post("/Room", {roomName, createdBy});
}

}
