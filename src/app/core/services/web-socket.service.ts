import { DataPacket } from 'src/app/core/models/data-packet';
import { Injectable } from '@angular/core';
import { Observable, observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws: WebSocket;
  private socketIsOpen = 1;

  //To be improved
  private recivedMessages: Subject<string>;

  constructor() {
    this.recivedMessages = new Subject<string>();
  }

  create(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => console.log("Client Connected");
    this.ws.onclose = () => console.log("Client Disconencted");
    this.ws.onmessage = (event: any) => {
      // Could pass onto another service to manage the data packet. 
      var dataPacket: DataPacket = JSON.parse(event.data);
      this.recivedMessages.next(dataPacket.eventData.content);
    };
    this.ws.onerror = (event) => console.log(event);
  }

  send(dataPacket: DataPacket){
    var setTimeoutId = setTimeout(() =>{
      try{
        if (this.ws.readyState === this.socketIsOpen) {
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

