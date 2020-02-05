import { AuthService } from './auth.service';
import { DataPacket } from 'src/app/core/models/data-packet';
import { Injectable } from '@angular/core';
import { Observable, observable, Subject } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws: WebSocket;
  private recivedMessages: Subject<DataPacket>;

  constructor() {
    this.recivedMessages = new Subject<DataPacket>();
  }

  public CurrentUser() : Number {
      return +decode(localStorage.getItem('token')).nameid;
  }

  create(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => console.log("Client Connected");
    this.ws.onclose = () => console.log("Client Disconencted");
    this.ws.onmessage = (event: any) => {   
        var dataPacket:DataPacket = JSON.parse(event.data);   
        dataPacket.eventData.fromCurrentUser = (this.CurrentUser() === dataPacket.eventData.senderId)
      this.recivedMessages.next(dataPacket);
    };
    this.ws.onerror = (event) => console.log(event);
  }

  send(dataPacket: DataPacket){
    var setTimeoutId = setTimeout(() =>{
      try{
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(dataPacket));
          console.log(`Sent to server ${JSON.stringify(dataPacket)}`);
          clearTimeout(setTimeoutId);
        }
      }
      catch (err){
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

