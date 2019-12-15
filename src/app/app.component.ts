import { WebSocketService } from './services/web-socket.service';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscribable, Subscription } from 'rxjs';


// Creating a WebSocket connection currently will overwrite any previous connections
// I.e the message will be sent fron the latest connection made.
// I.e the close() will close the latest connection opened
// I.e any previous connections made will be left open.
// This need to be considered and managed.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  messageFromServer: string;
  wsSubscription: Subscription;
  status;

  constructor(private http: HttpClient, private wsService: WebSocketService) {
  }

  sendMessageToServer() {
    this.status = this.wsService.sendMessage('Hello from client');
    console.log(this.status);
  }

  openConnection() {

    this.wsSubscription =  this.wsService.create('ws://localhost:5000')
    .subscribe(
      data => this.messageFromServer = data,
      err => console.log(err),
      () => console.log('The observeable is complete')
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





