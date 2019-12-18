import { WebSocketService } from '../../../services/web-socket.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat-room',
  templateUrl: './ChatRoom.component.html',
  styleUrls: ['./ChatRoom.component.css']
})
export class ChatRoomComponent implements OnDestroy {

  messagesFromServer: any;
  wsSubscription: Subscription;
  status;

  constructor(private http: HttpClient, private wsService: WebSocketService) {
  }

  sendMessageToServer() {
    this.status = this.wsService.sendMessage('Hello from client');
    console.log(this.status);
  }

  openConnection() {

    this.wsSubscription = this.wsService.create('ws://localhost:5000')
      .subscribe(
        data => this.messagesFromServer = data,
        err => console.log(err)
      );
  }

  closeSocket() {
    this.wsSubscription.unsubscribe();
    this.status = 'The socket is closed';
  }

  ngOnDestroy(): void {
    this.closeSocket();
  }

}
