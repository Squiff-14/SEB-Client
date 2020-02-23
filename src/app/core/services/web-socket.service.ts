import { AuthService } from './auth.service';
import { DataPacket } from 'src/app/core/models/data-packet';
import { Injectable } from '@angular/core';
import { Observable, observable, Subject } from 'rxjs';
import decode from 'jwt-decode';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws: WebSocket;
  private recivedMessages: Subject<Message>;

  constructor(private authService: AuthService) {
    this.recivedMessages = new Subject<Message>();
  }

  create(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => console.log("Client Connected");
    this.ws.onclose = () => console.log("Client Disconencted");
    this.ws.onmessage = (event: any) => {
      
      const dataPacket: DataPacket = JSON.parse(event.data);
      
      const message: Message = {
        message: null,
        user: dataPacket.eventData.senderId,
        sentAt: dataPacket.eventData.timestamp,
        content: dataPacket.eventData.content
      } 
      this.recivedMessages.next(message); 
    };
    this.ws.onerror = (event) => console.log(event);
  }

  send(dataPacket: DataPacket) {
    var setTimeoutId = setTimeout(() => {
      try {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(dataPacket));
          console.log(`Sent to server ${JSON.stringify(dataPacket)}`);
          clearTimeout(setTimeoutId);
        }
      }
      catch (err) {
        console.log("connection not established");
        console.log(err);
      }
    }, 100)
  }

  close() {
    this.ws.close(1000, 'The user disconnected')
  }

  receivedMessages() {
    return this.recivedMessages.asObservable();
  }

}

