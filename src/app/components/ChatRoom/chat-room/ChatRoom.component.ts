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
    // Message comes from the client, must be serialized into json 
    // with other bits of information.
    // The WebSocket service can format this into json.  
    this.status = this.wsService.sendMessage('Hello from client');
    console.log(this.status);
  }

  openConnection() {
    
    // At the monent every click of "OpenConnection" will create a new web socket
    // request establishing a new connection leaving the previous still open and no
    // way to get it back. 

    // Messages from the server is currenty just being replaced when data is recieved by the
    // subscription. 
    // This needs to be subscribed to an observable that has all of the messages and is grows.
    // Once the messages have been ordered after recieving a new message, then emit for the
    // subscription to change its data.   
    this.wsSubscription = this.wsService.create('ws://localhost:5000')
      .subscribe(
        data => this.messagesFromServer = data,
        err => console.log(err)
      );
  }

  closeSocket() {
    // This makes a webscoket request to the server with message type is "Close".
    // Middleware will handle closed Connections by removinging the websocket connection from the
    // Concurrent list. 
    this.wsSubscription.unsubscribe();
    this.status = 'The socket is closed';
  }

  ngOnDestroy(): void {
    this.closeSocket();
  }

}
