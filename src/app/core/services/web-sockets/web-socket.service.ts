import { RoomService } from './../rooms/room.service';
import { AuthService } from '../authentication/auth.service';
import { DataPacket } from 'src/app/core/models/data-packet';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws: WebSocket;
  private receivedDataPackets: Subject<DataPacket>;

  constructor(private authService: AuthService, private roomService: RoomService) {
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

  public connectToRooms() {
    this.roomService.getRooms("").subscribe({
      next: res => {
        res.forEach((room) => {
          this.send({
            eventType: "on-link-room",
            eventData: {
              messageId: Guid.create().toString(),
              senderId: 0,
              roomId: room.roomId,
              content: "",
              timestamp: new Date(),
              username: ""
            }
          });
        });
      },
      error: err => console.log(err)
    });
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

