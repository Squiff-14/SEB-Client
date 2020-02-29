import { WebSocketService } from './../web-sockets/web-socket.service';
import { User } from 'src/app/core/models/User';
import { MessageHistory } from '../../models/message-history';
import { AuthService } from '../authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private wsService: WebSocketService) { }

  public getMessageHistory(roomId: number, before: any) {
    const user: User = this.authService.currentUser();
    return this.http.get<MessageHistory>(`/Message/${roomId}/history/${user.userId}?before=${before}`);
  }

}
