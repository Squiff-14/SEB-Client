import { DataPacket } from 'src/app/models/data-packets/data-packet';
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
    this.ws = new WebSocket(url);
    this.ws.onopen = () => console.log("Client Connected");
    this.ws.onclose = () => console.log("Client Disconencted");
    this.ws.onmessage = (event: any) => {

      // Could pass onto another service to manage the data packet. 
      var dataPacket:any = JSON.parse(event.data);

      // Not every data packet recieved will have content
      // this is a test to grow message list in chat component 
      this.recivedMessages.next(dataPacket.content);

    };
    this.ws.onerror = (event) => console.log(event);
  }

  // Not needed with an observable  
  // bind(eventType: string, fn: (data: object) => any) {
  //   this.callBacks[eventType] = this.callBacks[eventType] || [];
  //   this.callBacks[eventType].push(fn);
  //   return this;
  // }
  // managePacket(eventType: any, eventData: any) {
  //   this.recivedMessages.next(eventData.content)
  // }

  send(dataPacket: DataPacket): string {
    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.send(JSON.stringify(dataPacket));
      return `Sent to server ${JSON.stringify(dataPacket)}`;
    }
    else return 'WebSocket connection is not open';
  }

  close() {
    this.ws.close(1000, 'The user disconnected')
  }

  receivedMessages() {
    return this.recivedMessages.asObservable();
  }

}

