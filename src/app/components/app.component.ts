import { WebSocketService } from './../services/web-socket.service';
import { AuthService } from './../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscribable, Subscription, Observable } from 'rxjs';


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
export class AppComponent {

  // Create WebSocketConnection
  // Pass fake user (for now) in query params. 

  constructor(private wsService: WebSocketService) {
    //Move to Auth Guard, Will disconnect on page refresh, re-connect on re-load if authenticated.
    this.wsService.create(`ws://localhost:5000?id=${Math.ceil(Math.random() * 10)}`);
    
  }
}





