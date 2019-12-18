import { WebSocketService } from '../services/web-socket.service';
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
export class AppComponent  {

  constructor() {
  }

}





