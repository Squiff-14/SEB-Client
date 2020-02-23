import { MessageHistory } from './../models/message-history';
import { AuthService } from './auth.service';
import { Message } from './../models/message';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getMessageHistory(roomId: number, before: any) {

    const userId = this.authService.currentUser();
    console.log(before)
    return this.http.get<MessageHistory>(`/Message/${roomId}/history/${userId}?before=${before}`);

  }

}
