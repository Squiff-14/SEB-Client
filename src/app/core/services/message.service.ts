import { AuthService } from './auth.service';
import { Message } from './../models/message';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getMessageHistory(roomId: number, beforeId: number) {

    const userId = this.authService.currentUser();
    return this.http.get<Message[]>(`/Message/${roomId}/history/${userId}?${beforeId}`);

  }

}
