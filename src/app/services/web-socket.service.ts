import { DataPacket } from '../models/data-packets/data-packet'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;
  socketIsOpen = 1;
  callBacks: Object;

  constructor() {
    this.callBacks = {};
  }

  create(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onopen = () => console.log("Client Connected");
    this.ws.onclose = () => console.log("Client Disconencted");
    this.ws.onmessage = (event: any) => {
      var dataPacket: DataPacket = JSON.parse(event.data);
      this.managePacket(dataPacket.eventType, dataPacket.eventData);
    };
    this.ws.onerror = (event) => this.managePacket('error', event);
  }

  //chainable callback functions bound to an event name;
  bind(eventType: string, fn: (data: object) => any) {
    this.callBacks[eventType] = this.callBacks[eventType] || [];
    this.callBacks[eventType].push(fn);
    return this;
  }

  managePacket(eventType: string, eventData: object) {
    var chain = this.callBacks[eventType];
    if (!chain) return;
    chain.map((callback) => callback(eventData));
  }

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

}

