import { DataPacket } from '../models/DataPacket/DataPacket';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;
  socketIsOpen = 1;
  dataStream: Observable<any>;
  callBacks: Object; //Object of EventName : Callback fn

  constructor() {
    this.callBacks = {};
  }

  create(url: string) {
    this.ws = new WebSocket(url);
    // this.dataStream = new Observable(
    //   observer => {
    this.ws.onopen = () => this.managePacket('open', null);
    this.ws.onclose = () => { this.managePacket('close', null) };
    this.ws.onmessage = (event: any) => {
      var dataPacket = JSON.parse(event.data);
      this.managePacket(dataPacket.event, dataPacket.data);
    };
    this.ws.onerror = (event) => this.managePacket('error', event); // Not sure about this

    // callback invoked on unsubscribe()
    // return () => this.ws.close(1000, 'The user disconnected');
    // }
    // );
  }

  //chainable callback functions bound to an event name;
  bind(eventName: string, fn: (data: object) => any) {
    this.callBacks[eventName] = this.callBacks[eventName] || [];
    this.callBacks[eventName].push(fn);
    return this;
  }

  managePacket(eventName: string, eventData) {
    var chain = this.callBacks[eventName];
    if (!chain) { return; }
    chain.map((callback) => callback(eventData));
  }

  send(eventName: string, data: any): string {
    if (this.ws.readyState === this.socketIsOpen) {
      var dataPacket = { EventType: eventName, EventData: data }
      this.ws.send(JSON.stringify(dataPacket));
      return `Sent to server ${dataPacket}`;
    } else {
      return 'WebSocket connection is not open';
    }
  }

  close() {
    this.ws.close(1000, 'The user disconnected')
  }

}

