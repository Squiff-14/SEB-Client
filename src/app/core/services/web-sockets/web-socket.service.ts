import { AuthService } from '../authentication/auth.service';
import { DataPacket } from 'src/app/core/models/data-packet';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../models/message';
import { MessageType } from '../../models/enums/MessageType';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws: WebSocket;
  private receivedDataPackets: Subject<DataPacket>;

  constructor(private authService: AuthService) {
    this.receivedDataPackets = new Subject<DataPacket>();
  }

  public create(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => console.log("Client Connected");
    this.ws.onclose = () => {
      console.log("Client Disconencted")
    };
    this.ws.onmessage = (event: any) => this.receivedDataPackets.next(JSON.parse(event.data));
    this.ws.onerror = (event) => console.log(event);
  }

  public send(dataPacket: DataPacket) {
    var setTimeoutId = setTimeout(() => {
      try {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(dataPacket));
          clearTimeout(setTimeoutId);
        }
      }
      catch (err) {
        console.error("connection not established");
        console.error(err);
      }
    }, 100)
  }

  public close() {
    this.ws.close(1000, 'The user disconnected')
  }

  public dataPackets() {
    return this.receivedDataPackets.asObservable();
  }

  public isReady(): boolean {
    return this.ws.readyState == WebSocket.OPEN
  }

}

